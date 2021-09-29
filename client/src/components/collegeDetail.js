import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Col, Space, Row, Descriptions, Skeleton } from "antd";
import StudentList from "./studentList";
import CollegeList from "./collegeList";

const CollegeDetail = () => {
  const { collegeid } = useParams();
  const [collegeData, setCollegeData] = useState({});
  const [collegeDataLoading, setCollegeDataLoading] = useState(true);
  useEffect(() => {
    fetch(`/college/id/${collegeid}`)
      .then((res) => res.json())
      .then((data) => setCollegeData(data[0]))
      .then((t) => setCollegeDataLoading(false));
  }, [collegeData]);

  const loading = (
    <div>
      <Skeleton active />
    </div>
  );

  const collegeDetails = (
    <div>
      <h1
        style={{
          fontWeight: "bold",
          fontSize: "large",
          fontFamily: "cursive",
          marginBottom: "1em",
        }}
      >
        College Details
      </h1>
      <Descriptions
        bordered
        column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
      >
        <Descriptions.Item label="Name">{collegeData.name}</Descriptions.Item>
        <Descriptions.Item label="City">{collegeData.city}</Descriptions.Item>
        <Descriptions.Item label="State">{collegeData.state}</Descriptions.Item>
        <Descriptions.Item label="Year Founded">
          {collegeData.yearFounded}
        </Descriptions.Item>
        <Descriptions.Item label="No of Students">
          {collegeData.noOfStudents}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );

  return (
    <Row align="center">
      <Col>
        <Space direction="vertical">
          <Card>{collegeDataLoading ? loading : collegeDetails}</Card>
          <Card>
            <h1
              style={{
                fontWeight: "bold",
                fontSize: "large",
                fontFamily: "cursive",
                marginBottom: "1em",
              }}
            >
              Students of the College
            </h1>
            <StudentList collegeid={collegeid} />
          </Card>
          <Card>
            <h1
              style={{
                fontWeight: "bold",
                fontSize: "large",
                fontFamily: "cursive",
                marginBottom: "1em",
              }}
            >
              Similar colleges
            </h1>
            <CollegeList filterBy="similar" />
          </Card>
        </Space>
      </Col>
    </Row>
  );
};

export default CollegeDetail;
