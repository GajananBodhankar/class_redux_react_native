import {Button, FlatList, Text, View} from 'react-native';
import React, {Component} from 'react';
import {useAppDispatch} from './Reducer';
import {loading, success} from './Slice';
import {connect} from 'react-redux';

const renderFlat = ({item, index}: any) => (
  <Text>
    {item.title} {item.id}
  </Text>
);
interface Icount {
  count: number;
}
interface Iprops {
  loading: () => void;
  data: [];
  status: string;
}
class Index extends Component<Iprops, Icount> {
  constructor(props: Iprops) {
    super(props);
    this.state = {count: 50};
  }
  apiCall = () => {
    this.props?.loading();
    console.log(this.props);
  };
  render() {
    let data = this.props.data;
    let status = this.props.status;
    return (
      <View>
        <Text>View</Text>
        <Button
          title="Make Api call"
          onPress={() => {
            this.apiCall();
          }}
        />
        <Text>{status}</Text>
        {status == 'Success' && (
          <FlatList
            data={data}
            renderItem={renderFlat}
            onScrollEndDrag={() => {
              this.setState({count: this.state.count + 10});
              console.log(this.state.count);
              // data=this.props.data.filter((i,j)=>)
            }}
          />
        )}
      </View>
    );
  }
}
const mapStateToProps = (state: {SliceReducer: {data: any; status: any}}) => {
  const data = state.SliceReducer.data;
  const status = state.SliceReducer.status;
  return {
    data,
    status,
  };
};
const mapDispatchToProps = (dispatch: (arg0: {type: string}) => any) => {
  return {
    // dispatching plain actions
    loading: () => dispatch(loading()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
