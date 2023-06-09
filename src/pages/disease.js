import { Table } from "antd";
import axios from "axios";
import React from "react";
import config from "../config";

const formatResponse = (data) => {
  let res = [];
  if (!data || data.length <= 0) return null;
  for (let i = 0; i < data.length; i++) {
    res.push({
      disease: data[i].disease.name ? data[i].disease.name : "",
      gene: data[i].gene ? data[i].gene.name : "",
      variant: data[i].variant ? data[i].variant.name : "",
      drug: data[i].drug ? data[i].drug.id : "",
      relation: data[i].relation_type ? data[i].relation_type : "",
      doc_num: data[i].pmids ? data[i].pmids.length : 0,
    });
  }

  return res;
};

class Disease extends React.Component {
  // fetchData()
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      items: [],
    };
  }

  componentDidMount() {
    axios
      .get(`${config.host}/disease?limit=${config.pageSize}&from=0`)
      .then((res) => {
        this.setState({
          total: res.data.total_hits,
          items: formatResponse(res.data.diseases),
        });
      });
  }

  columns = [
    {
      title: "Disease name",
      dataIndex: "disease",
      key: "disease",
      sorter: (a, b) => (a.disease < b.disease ? -1 : 1),
    },
    {
      title: "Gene name",
      dataIndex: "gene",
      key: "gene",
      sorter: (a, b) => (a.gene < b.gene ? -1 : 1),
    },
    {
      title: "Variant name",
      dataIndex: "variant",
      key: "variant",
      sorter: (a, b) => (a.variant < b.variant ? -1 : 1),
    },
    {
      title: "Drug name",
      dataIndex: "drug",
      key: "drug",
      sorter: (a, b) => (a.drug < b.drug ? -1 : 1),
    },
    {
      title: "Relation",
      dataIndex: "relation",
      key: "relation",
      sorter: (a, b) => (a.relation < b.relation ? -1 : 1),
    },
    {
      title: "No. document",
      dataIndex: "doc_num",
      key: "doc_num",
      sorter: (a, b) => a.doc_num - b.doc_num,
    },
  ];

  render() {
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "Center",
            alignItems: "Center",
            // height: "100vh",
          }}
        >
          <h1>Diseases</h1>
        </div>
        <div>
          <Table
            dataSource={this.state.items}
            columns={this.columns}
            pagination={{
              defaultPageSize: config.pageSize,
              total: 2000,
              showSizeChanger: true,
              pageSizeOptions: ["50", "100", "500"],
              onChange: (page, pageSize) => {
                axios
                  .get(
                    `${config.host}/disease?limit=${pageSize}&from=${
                      (page - 1) * pageSize
                    }`
                  )
                  .then((res) => {
                    this.setState({
                      total: res.data.total_hits,
                      items: formatResponse(res.data.diseases),
                    });
                  });
              },
              onShowSizeChange: (current, size) => {
                axios
                  .get(
                    `${config.host}/disease?limit=${size}&from=${
                      (current - 1) * size
                    }`
                  )
                  .then((res) => {
                    this.setState({
                      total: res.data.total_hits,
                      items: formatResponse(res.data.diseases),
                    });
                  });
              },
            }}
          />
        </div>
      </div>
    );
  }
}

export default Disease;
