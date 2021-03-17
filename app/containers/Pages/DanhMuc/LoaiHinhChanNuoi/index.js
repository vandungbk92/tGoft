import React, { Component, Fragment } from 'react';
import { Button, Table, Popconfirm, message, Card, Tooltip} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { add, getById, getAll, delById, updateById } from '@services/danhmuc/loaihinhchannuoiService';
import { PAGINATION_CONFIG } from '@constants';
import { createStructuredSelector } from 'reselect';
import { makeGetLoading } from '@containers/App/AppProvider/selectors';
import { connect } from 'react-redux';
import Search from '@components/Search/Search';
import { stringify } from 'qs';
import queryString from 'query-string';
//import { fetchLoaiHinhChanNuoi } from '@reduxApp/HoatDongSanXuat/actions';
import LoaiHinhChanNuoiModal from 'Pages/DanhMuc/LoaiHinhChanNuoi/LoaiHinhChanNuoiModal';

class LoaiHinhChanNuoi extends Component {

  columns = [
    {
      title: 'Loại hình chăn nuôi ',
      dataIndex: 'tenloaihinh',
      width: 400,

    },
    {
      title: 'Thứ tự',
      dataIndex: 'thutu',
      width: 150,
      align: 'center',
    },
    {
      title: 'Hành động',
      render: (value) => this.formatActionCell(value),
      width: 150,
      align: 'center',
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      dataRes: [],
      page: 1,
      limit: 10,
      totalDocs: 0,
      data: null
    };
  }

  componentDidMount() {
    this.getDataFilter();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.location.search !== prevProps.location.search) {
      this.getDataFilter();
    }
  }

  async getDataFilter() {
    let search = queryString.parse(this.props.location.search);
    let page = parseInt(search.page ? search.page : this.state.page);
    let limit = parseInt(search.limit ? search.limit : this.state.limit);
    let queryStr = '';
    queryStr += `${search.tenloaihinh ? '&tenloaihinh[like]={0}'.format(search.tenloaihinh) : ''}`;
    const apiResponse = await getAll(page, limit, queryStr);
    if (apiResponse) {
      const dataRes = apiResponse.docs;
      this.setState({
        dataRes,
        totalDocs: apiResponse.totalDocs,
        limit: apiResponse.limit,
        page: apiResponse.page,
      });
    }
  }

  async handleDelete(value) {
    const apiResponse = await delById(value._id);
    if (apiResponse) {
      this.getDataFilter();
      //this.props.dispatch(fetchLoaiHinhChanNuoi());
      message.success('Xoá loại hình chăn nuôi thành công');
    }
  }

  toggleModal = (data) => {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal, data });
  };

  formatActionCell(value) {
    return <Fragment>
      <Tooltip placement="left" title={'Cập nhật thông tin'} color="#2db7f5">
        <Button icon={<EditOutlined/>} size='small' type="primary" className='mr-1' //ant-tag-cyan
                onClick={() => this.toggleModal(value)}></Button>
      </Tooltip>

      <Popconfirm key={value._id} title="Bạn chắc chắn muốn xoá?"
                  onConfirm={() => this.handleDelete(value)}
                  cancelText='Huỷ' okText='Xoá' okButtonProps={{ type: 'danger' }}>
        <Tooltip placement="right" title={'Xóa dữ liệu'} color="#f50">
          <Button icon={<DeleteOutlined/>} type='danger' size='small' className="mr-1"></Button>
        </Tooltip>
      </Popconfirm>
    </Fragment>;
  }

  handleRefresh = (newQuery, changeTable) => {
    const { location, history } = this.props;
    const { pathname } = location;
    let { page, limit } = this.state;
    let objFilterTable = { page, limit };
    if (changeTable) {
      newQuery = queryString.parse(this.props.location.search);
      delete newQuery.page;
      delete newQuery.limit;
    }
    newQuery = Object.assign(objFilterTable, newQuery);
    history.push({
      pathname, search: stringify({ ...newQuery }, { arrayFormat: 'repeat' }),
    });
  };

  onChangeTable = (page) => {
    this.setState({ page: page.current, limit: page.pageSize },
      () => {
        this.handleRefresh({}, true);
      });
  };

  getDataAfterSave = (data, type) => {
    // type = ADD thêm mới.
    if(type === 'ADD'){
      this.getDataFilter();
    }else if(type === 'UPDATE'){
      const dataRes = this.state.dataRes.map(curr => {
        if (data._id === curr._id) {
          return data
        }
        return curr;
      });
      this.setState({ dataRes });
    }
  }

  render() {
    const { loading } = this.props;
    const { dataRes, totalDocs, page, limit } = this.state;
    const dataSearch = [{
      type: 'text',
      operation: 'like',
      name: 'tenloaihinh',
      label: 'Tên loại hình',
    }];
    return <div>


      <Card size="small" title={<span>
        <UnorderedListOutlined className="icon-card-header"/> &nbsp;Danh sách loại hình chăn nuôi
      </span>} md="24" bordered extra={<div>
        <Button type="primary" onClick={() => this.toggleModal(null)} className='pull-right' size="small"
                icon={<PlusOutlined/>}>Thêm</Button>
      </div>}>
        <Search onFilterChange={this.handleRefresh} dataSearch={dataSearch}/>
        <Table loading={loading} bordered columns={this.columns} dataSource={dataRes}
               size="small" rowKey="_id"
               pagination={{
                 ...PAGINATION_CONFIG,
                 current: page,
                 pageSize: limit,
                 total: totalDocs,
               }}
               onChange={this.onChangeTable}/>
      </Card>
      <LoaiHinhChanNuoiModal data={this.state.data} showModal={this.state.showModal} getDataAfterSave={this.getDataAfterSave}/>
    </div>;
  }
}

const mapStateToProps = createStructuredSelector({
  loading: makeGetLoading(),
});

const withConnect = connect(mapStateToProps);

export default withConnect(LoaiHinhChanNuoi);
