import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Space, Row, Col, Table, Tag } from "antd";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
    sortDirections: ["descend", "ascend"],
    render: (name, record) => {
      return (
        <a href={`http://localhost:5000/college/id/${record._id}`}>{name}</a>
      );
    },
  },
  {
    title: "City",
    dataIndex: "city",
    key: "city",
    sorter: (a, b) => a.city.localeCompare(b.city),
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "State",
    dataIndex: "state",
    key: "state",
    sorter: (a, b) => a.state.localeCompare(b.state),
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Year Founded",
    dataIndex: "yearFounded",
    key: "yearFounded",
    sorter: (a, b) => a.yearFounded - b.yearFounded,
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Number of Students",
    dataIndex: "noOfStudents",
    key: "noOfStudents",
    sorter: (a, b) => a.noOfStudents - b.noOfStudents,
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Courses",
    key: "courses",
    dataIndex: "courses",
    render: (courses) => (
      <>
        {courses.map((course) => {
          let color;
          if (course === "CIVIL") {
            color = "volcano";
          } else if (course === "MECH") {
            color = "geekblue";
          } else if (course === "IT") {
            color = "purple";
          } else if (course === "CSE") {
            color = "green";
          }
          return (
            <Tag color={color} key={course}>
              {course.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
];

const CollegeList = (props) => {
  const [collegeListData, setCollegeListData] = useState([]);
  const [collegeListDataLoading, setCollegeListDataLoading] = useState(true);
  const { statename, coursename, collegeid } = useParams();

  useEffect(() => {
    if (props.filterBy === "similar") {
      fetch(`/college/similar/${collegeid}/`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => setCollegeListData(data))
        .then((t) => setCollegeListDataLoading(false))
        .catch((err) => alert(err));
    }
    if (props.filterBy === "course") {
      fetch(`/college/course/${coursename}/`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => setCollegeListData(data))
        .then((t) => setCollegeListDataLoading(false))
        .catch((err) => alert(err));
    }
    if (props.filterBy === "state") {
      fetch(`/college/state/${statename}/`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => setCollegeListData(data))
        .then((t) => setCollegeListDataLoading(false))
        .catch((err) => alert(err));
    }
    if (props.filterBy === "none") {
      fetch(`/college/list/`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => setCollegeListData(data))
        .then((t) => setCollegeListDataLoading(false))
        .catch((err) => alert(err));
    }
  }, []);

  return (
    <div>
      <Row align="center">
        <Col>
          <Space direction="vertical">
            <Table
              columns={columns}
              dataSource={collegeListData}
              loading={collegeListDataLoading}
            />
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default CollegeList;
