import React, { Component, PropTypes } from 'react';
import ProxyItem from './ProxyItem';
import FireBase from 'firebase';
import * as bs from 'react-bootstrap';
import * as actions from '../actions';
// const socket = io.connect('http://localhost:8080');
const socket = io.connect('http://104.155.44.221:8080');
import Immutable from 'immutable';

const {
  Table, Col
} = bs;

export default class ProxyList extends Component {
  constructor(props) {
    super(props);
    this.showdata = this.showdata.bind(this);
    // setInterval(()=>{
      // dispatch(actions.)
    // })
  }
  showdata(data) {
    // this.state.items.set(data.id, {key: data.id, payload: data});
    this.setState({items: this.state.items.set(data.id, {key: data.id, payload: data})});
    console.log('showing data ' + JSON.stringify(data));
  }
  // renderLoadMore() {
  //   const { isFetching, onLoadMoreClick } = this.props;
  //   return (
  //     <button style={{ fontSize: '150%' }}
  //             onClick={onLoadMoreClick}
  //             disabled={isFetching}>
  //       {isFetching ? 'Loading...' : 'Load More'}
  //     </button>
  //   );
  // }
  // getInitialState () {
  //     return {
  //       items: []
  //     };
  //   }

  componentDidMount() {
    const { dispatch, proxycounters } = this.props;
    socket.on('connect', function (socket) {
      socket
        .on('authenticated', function () {
          //do other things
        })
        .emit('authenticate', {token: jwt}); //send the jwt
      });
     //var io = require('socket.io')(require('http').Server(app));
      socket.on('proxydata', function (data) {
          // console.log('found proxy data ' + JSON.stringify(data));

          // this.showdata(data);
          this.setState({items: this.state.items.set(data.id, {key: data.id, payload: data})});
                // dispatch(actions.receiveProxyCounters(data));
            // //     // socket.on('echo', function (data) {
            // //     //   io.sockets.emit('message', data);
            // this.render();
            // //     // });
      }.bind(this));

  }

  componentWillUnmount() {
    socket.close();
  }

  componentWillMount() {
    this.setState({items: Immutable.Map()});

    //  this.firebaseRef = new Firebase('https://rtbzy.firebaseio.com/proxycounter/');
    //  this.firebaseRef.on('value', function(dataSnapshot) {
    //    var items = [];
    //    dataSnapshot.forEach(function(childSnapshot) {
    //      var item = childSnapshot.val();
    //      item['.key'] = childSnapshot.key();
    //      items.push(item);
    //    }.bind(this));
     //
    //    this.setState(
    //      {
    //        items: items.sort((a,b) => { if (a.views > b.views) return -1; if(a.views < b.views) return 1; return 0;})
    //      });
    //  }.bind(this));
  }

  render() {
    const {proxies} = this.props;
    // const {items} = this.getState();
      // console.log('render ' + this.state.items.toArray().map((v)=>v.payload.id));
    //if (this.state) {
      //const { items } = this.state;

      return (
        <Col md={6} xs={6}>
        <Table striped bordered condensed hover responsive>
          <thead>
          <tr>
            <td>Venue</td>
            <td>Views</td>
            <td>Mobile</td>
            <td>InApp</td>
          </tr>
          </thead>
          <tbody>
            { this.state.items.toArray().sort((a,b)=>{
                if(a.payload.views > b.payload.views) return -1;
                if(a.payload.views < b.payload.views) return 1;
                return 0; }).map((prx) => (
              <ProxyItem proxycounter={{views: prx.payload.views,
                      proxy: this.props.entities.proxies[prx.payload.id],
                      mobile: prx.payload.mobile,
                      inapp: prx.payload.inapp}} key={prx.payload.id}
                      />
                  ))        }
          </tbody>
        </Table>
      </Col>
      );
    //}
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
}
/*

{ this.state.items.sort((a,b)=>{
    if(a.views > b.views) return -1;
    if(a.views < b.views) return 1;
    return 0; }).map((prx, i) => {  <ProxyItem proxycounter={{ views: prx.views,
          proxy: this.props.entities.proxies[prx.id],
          mobile: prx.mobile,
          inapp: prx.inapp}} key={i} />
    })
}
{ proxycounters.sort((a,b)=>{
  if(a.payload.views > b.payload.views) return -1;
  if(a.payload.views < b.payload.views) return 1;
  return 0; }).map((prx, i) => <ProxyItem proxycounter={prx.payload} key={i}/> ) }
*/
/*        {items.map((it, i)=> <p>it key={i}</p>)}*/

// ProxyList.propTypes = {
//   proxies: PropTypes.array.isRequired
// };
//
/*
List.propTypes = {
  loadingLabel: PropTypes.string.isRequired,
  pageCount: PropTypes.number,
  renderItem: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onLoadMoreClick: PropTypes.func.isRequired,
  nextPageUrl: PropTypes.string
};

ProxyList.defaultProps = {
  isFetching: true,
  loadingLabel: 'Loading...'
};
*/
