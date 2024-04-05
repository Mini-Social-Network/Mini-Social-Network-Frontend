import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import { Col, Row, DatePicker, Space, Modal, Form, InputNumber, Select, notification, Input, Radio, Image } from 'antd';
import { Table } from 'components/common/Table/Table';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import UserService from './UserPageService';
import { Button } from '@app/components/common/buttons/Button/Button';
import * as s from './Tables.styles';
import dfavt from '@app/share/dfavt.png';

import moment from 'moment';
import 'moment/locale/vi';
import { ColumnsType } from 'antd/es/table';
import { CheckCircleOutlined, CheckCircleTwoTone, CloseCircleOutlined } from '@ant-design/icons';
=======
import { Col, Row, DatePicker, Space, Modal, Form, InputNumber, Select, notification, Input, Radio } from 'antd';
import { Table } from 'components/common/Table/Table';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import * as S from '@app/pages/uiComponentsPages//UIComponentsPage.styles';
import UserService from './UserPageService';
import { Button } from '@app/components/common/buttons/Button/Button';
import * as s from './Tables.styles';

import moment from 'moment';
import { ColumnsType } from 'antd/es/table';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationOutlined,
  FireOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
>>>>>>> main
import { notificationController } from '@app/controllers/notificationController';
import { AnyIfEmpty } from 'react-redux';
import { getData } from 'country-list';
import { number } from 'echarts';
<<<<<<< HEAD
import userService from './UserPageService';

const { Search } = Input;
=======
>>>>>>> main

const User: React.FC = () => {
  const { t } = useTranslation();
  const [usersData, setusersData] = useState<any>([]);

<<<<<<< HEAD
  const [userSelected, setuserSelected] = useState<any>(null);
=======
>>>>>>> main
  const [isOpenAdd, setIsOpenAdd] = useState<boolean>(false);
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  const [isOpenCancel, setIsOpenCancel] = useState<boolean>(false);
  const [isOpenConfirmCancel, setIsOpenConfirmCancel] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

<<<<<<< HEAD
  const [keyWord, setKeyWord] = useState<any>();

=======
  const [status, setStatus] = useState<string>('running');
  const [searchValue, setSearchValue] = useState<any>();
  const [form] = Form.useForm();
  const [formAdd] = Form.useForm();
>>>>>>> main
  const [admin, setAdmin] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);

  interface UserListSelectType {
    lable: string;
    value: string;
  }
  interface UserDataType {
    key: React.Key;
    id: number;
    name: string;
    email: string;
    emailVerified: boolean;
    role: string;
    provider: string;
    topicId: string;
    status: number;
    phoneNumber: string | null;
    isExpert: boolean;
    jobTitle: string | null;
    specialist: string | null;
    workPlace: string | null;
    description: string | null;
    delFlg: boolean;
    createAt: string | null;
    updateAt: string | null;
    lastTime: string | null;
  }
  const initData = {
    name: '',
    email: '',
    provider: [],
    role: ['user'],
  };
  const UserColumns: ColumnsType<UserDataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      showSorterTooltip: false,
    },
    {
<<<<<<< HEAD
      title: 'Thông tin',
      key: 'info',
      render: (record) => (
        <s.WrapperUser>
          <s.ImgWrapper>
            <Image
              src={record.imageUrl ? `http://localhost:8081/local-store/${record.imageUrl}` : dfavt}
              width={100}
              height={100}
              preview={false}
            ></Image>
          </s.ImgWrapper>
          <s.TitleWrapper>
            <s.Title level={5}>
              {record.name} {record.isExpert ? <CheckCircleTwoTone /> : null}
            </s.Title>
          </s.TitleWrapper>
        </s.WrapperUser>
      ),
=======
      title: 'name',
      dataIndex: 'name',
      key: 'name',
>>>>>>> main
      sorter: (a, b) => a.name.localeCompare(b.name),
      showSorterTooltip: false,
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
      showSorterTooltip: false,
    },
    {
<<<<<<< HEAD
      title: 'Trạng thái email',
      key: 'emailVerified',
      render: (record) => (
        <s.WrapperUser>
          {record.emailVerified == true ? (
            <CheckCircleOutlined style={{ fontSize: '1.5rem', color: '#52c41a' }} />
          ) : (
            <CloseCircleOutlined style={{ fontSize: '1.5rem', color: '#eb2f96' }} />
          )}
        </s.WrapperUser>
      ),
    },
    {
      title: 'Quyền',
=======
      title: 'emailVerified',
      dataIndex: 'emailVerified',
      key: 'emailVerified',
    },
    {
      title: 'role',
>>>>>>> main
      dataIndex: 'role',
      key: 'role',
    },
    {
<<<<<<< HEAD
      title: 'Ngày tạo',
      key: 'createAt',
      render: (record) => <span>{moment(new Date(record.createAt)).locale('vi').format('hh:mm, DD MMMM YYYY')}</span>,
    },
    {
      title: 'Ngày cập nhật',
      key: 'updateAt',
      render: (record) => <span>{moment(new Date(record.updateAt)).locale('vi').format('hh:mm, DD MMMM YYYY')}</span>,
=======
      title: 'status',
      dataIndex: 'status',
      key: 'status',
    },

    {
      title: 'phoneNumber',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'createAt',
      dataIndex: 'createAt',
      key: 'createAt',
    },
    {
      title: 'updateAt',
      dataIndex: 'updateAt',
      key: 'updateAt',
>>>>>>> main
    },
  ];
  useEffect(() => {
    const getData: any = localStorage.getItem('UserData');
    const objDate = JSON.parse(getData);

    if (getData != null) {
      const isAdmin = objDate.role === 'admin' ? true : false;
      setAdmin(isAdmin);
      console.log(objDate, isAdmin);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
<<<<<<< HEAD
    setIsPending(false);
    UserService.GetUsers(initData).then((data: any) => {
      const resData: any = [];
      if (data.status === 1) {
        data.data.forEach((item: any) => {
          resData.push({
            ...item,
            key: item.id,
          });
        });
        setusersData(resData);
=======
    const resData: any = [];

    setIsPending(false);

    UserService.GetUsers(initData).then((data: any) => {
      if (data.status === 1) {
        setusersData(data.data);
>>>>>>> main
        setIsLoading(false);
      }
    });
  }, []);
<<<<<<< HEAD
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setuserSelected(null);
      selectedRows.forEach((item: any) => {
        const temp = usersData.find((x: any) => x.id === item.id);
        setuserSelected(temp);
      });
    },
    getCheckboxProps: (record: any) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };
  const onDeleteUser = () => {
    UserService.DelUsers(userSelected.id).then((data: any) => {
      if (data.status === 1) {
        notificationController.success({
          message: 'Xoá người dùng thành công',
        });
        setIsLoading(true);
        setIsPending(false);
        UserService.GetUsers(initData).then((data: any) => {
          const resData: any = [];
          if (data.status === 1) {
            data.data.forEach((item: any) => {
              resData.push({
                ...item,
                key: item.id,
              });
            });
            setusersData(resData);
            setIsOpenDelete(false);
            setIsLoading(false);
            setuserSelected(null);
          }
        });
      }
    });
  };
  const onSearch = (value: string) => {
    setKeyWord(value.trim());

    userService
      .GetUsers({
        name: value.trim(),
        email: '',
        provider: [],
        role: ['user'],
      })
      .then((data: any) => {
        const resData: any = [];
        if (data.status === 1) {
          data.data.forEach((item: any) => {
            resData.push({
              ...item,
              key: item.id,
            });
          });
        }
        setusersData(resData);
      });
  };
  return (
    <>
      <PageTitle>Trang quản lý người dùng</PageTitle>
      <s.TablesWrapper>
        <Search style={{ width: '30%' }} placeholder="Tìm kiếm người dùng" enterButton onSearch={onSearch} />
        <s.Card
          title={'Quản lý người dùng'}
          extra={
            userSelected ? (
              <div style={{ display: 'flex' }}>
                {admin ? (
=======
  return (
    <>
      <PageTitle>Trang quản lý User</PageTitle>
      <s.TablesWrapper>
        <s.Card
          title={t('common.order_list')}
          extra={
            !isPending ? (
              <div style={{ display: 'flex' }}>
                {admin ? (
                  <Button severity="success" onClick={() => setIsOpenAdd(true)}>
                    {t('common.add')}
                  </Button>
                ) : (
                  <div />
                )}
                {admin ? (
                  <Button severity="info" style={{ marginLeft: '15px' }} onClick={() => setIsOpenEdit(true)}>
                    {t('common.edit')}
                  </Button>
                ) : (
                  <div />
                )}
                {admin ? (
>>>>>>> main
                  <Button severity="error" style={{ marginLeft: '15px' }} onClick={() => setIsOpenDelete(true)}>
                    {t('common.delete')}
                  </Button>
                ) : (
                  <div />
                )}
<<<<<<< HEAD
=======
                {status === 'running' && (
                  <Button severity="error" style={{ marginLeft: '15px' }} onClick={() => setIsOpenCancel(true)}>
                    {t('common.cancel')}
                  </Button>
                )}
                {status === 'cancel' && (
                  <Button severity="error" style={{ marginLeft: '15px' }} onClick={() => setIsOpenConfirmCancel(true)}>
                    {t('common.cofirmCancel')}
                  </Button>
                )}
>>>>>>> main
              </div>
            ) : (
              <div style={{ display: 'flex' }}></div>
            )
          }
        >
          <Row style={{ width: '100%', marginTop: '10px' }}>
            <Col md={24}>
<<<<<<< HEAD
              <Table
                dataSource={usersData}
                columns={UserColumns}
                scroll={{ x: 2000 }}
                loading={isLoading}
                rowSelection={{
                  type: 'radio',
                  ...rowSelection,
                }}
              />
=======
              <Table dataSource={usersData} columns={UserColumns} scroll={{ x: 2000 }} loading={isLoading} />
>>>>>>> main
            </Col>
          </Row>
        </s.Card>
      </s.TablesWrapper>
<<<<<<< HEAD
      <Modal
        title={t('common.delete') + 'Người dùng'}
        visible={isOpenDelete}
        onCancel={() => setIsOpenDelete(false)}
        footer={[
          <>
            <Button style={{ display: 'inline' }} onClick={() => setIsOpenDelete(false)}>
              {t('common.close')}
            </Button>
            <Button
              style={{ display: 'inline' }}
              type="primary"
              className="btn btn-primary"
              onClick={() => onDeleteUser()}
              danger
            >
              {t('common.delete')}
            </Button>
          </>,
        ]}
      >
        <div>Bạn muốn xoá người dùng này ?</div>
      </Modal>
=======
>>>>>>> main
    </>
  );
};

export default User;
