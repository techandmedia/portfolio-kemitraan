import Layout from "../components/layout";
import axios from "axios";
// import Header from '../components/header';
// import Title from '../components/title';
import { Table, Input, InputNumber, Popconfirm, Form } from "antd";

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === "number") {
      return <InputNumber />;
    }
    return <Input />;
  };

  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {form => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [
                      {
                        required: true,
                        message: `Please Input ${title}!`
                      }
                    ],
                    initialValue: record[dataIndex]
                  })(this.getInput())}
                </FormItem>
              ) : (
                restProps.children
              )}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: [], editingKey: "" };
    this.columns = [
      {
        title: "Product Name",
        dataIndex: "productname",
        width: "15%",
        // fixed: 'left',
        editable: true
      },
      {
        title: "OS",
        dataIndex: "os",
        width: "10%",
        editable: true
      },
      {
        title: "Category",
        dataIndex: "category",
        width: "10%",
        editable: true
      },
      {
        title: "Model",
        dataIndex: "model",
        width: "10%",
        editable: true
      },
      {
        title: "Serial Number",
        dataIndex: "serialnumber",
        width: "10%",
        editable: true
      },
      {
        title: "Operation",
        dataIndex: "operation",
        width: "10%",
        render: (text, record) => {
          const editable = this.isEditing(record);
          return (
            <div>
              {editable ? (
                <span>
                  <EditableContext.Consumer>
                    {form => (
                      <a
                        href="javascript:;"
                        onClick={() => this.save(form, record.id)}
                        style={{ marginRight: 8 }}
                      >
                        Save
                      </a>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm
                    title="Sure to cancel?"
                    onConfirm={() => this.cancel(record.id)}
                  >
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
              ) : (
                <a onClick={() => this.edit(record.id)}>Edit</a>
              )}
            </div>
          );
        }
      }
    ];
  }

  static async getInitialProps () {
    // eslint-disable-next-line no-undef
    // console.log('query', query.id)
    const res = await axios.get('https://app.subarnanto.com/api/product/orderedbyname')
    // const res = await axios.get('http://localhost:5000/api/product')
    return { products: res.data }
  }

  // componentDidMount() {
  //   axios.get("/api/product/orderedbydate").then(res => {
  //     // axios.get('/api/product').then(res => {
  //     // axios.get('https://app.subarnanto.com/api/product/orderedbyname').then(res => {
  //     // axios.get("https://demo-kemitraan.subarnanto.com/api/product").then(res => {
  //     this.setState({ products: res.data });
  //     // console.log({ products: res.data });
  //   });
  // }

  isEditing = record => {
    return record.id === this.props.editingKey;
  };

  edit(id) {
    this.setState({ editingKey: id });
  }

  save(form, id) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.products];
      const index = newData.findIndex(item => id === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        this.setState({ products: newData, editingKey: "" });
        // console.log('newData', newData[index]) // data I want to update to API
        // console.log('index', index) // index adalah index array
        // console.log('id', id) // id adalah nomor index dalam tabel database, jangan sampai tertukar
        // console.log('category', newData[index].category)
        // console.log('productname', newData[index].productname)
        // console.log('os', newData[index].os)
        // console.log('serialnumber', newData[index].serialnumber)
        // console.log('model', newData[index].model)
        // console.log('detail', newData[index].detail)
        axios.put(`/api/product/update/${id}`, {
          category: newData[index].category,
          productname: newData[index].productname,
          os: newData[index].os,
          serialnumber: newData[index].serialnumber,
          model: newData[index].model,
          price: newData[index].price,
          equipment_condition: newData[index].equipment_condition,
          detail: newData[index].detail,
          image: newData[index].image
        });
      } else {
        newData.push(this.state.products);
        this.setState({ products: newData, editingKey: "" });
      }
    });
  }

  cancel = () => {
    this.setState({ editingKey: "" });
  };

  render() {
    
    // CONSOLE LOG CHEK
    console.log('props', this.props.products[0])
    // console.log('query', query.id)

    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === "serialnumber" ? "number" : "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record)
        })
      };
    });

    return (
      <Layout>
        <h1>Edit Data Produk</h1>
        <Table
          dataSource={this.props.products}
          rowKey={this.props.id}
          components={components}
          bordered          
          columns={columns}          
          scroll={{ x: 1200 }}
        />
      </Layout>
    );
  }
}

export default EditableTable;
