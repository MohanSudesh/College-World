import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Space, Row, Card, Col, Skeleton, Descriptions } from "antd";

const StudentDetail = () => {
  const { studentid } = useParams();
  const [studentData, setStudentData] = useState({});
  const [studentDataLoading, setStudentDataLoading] = useState(true);
  useEffect(() => {
    fetch(`/student/id/${studentid}`)
      .then((res) => res.json())
      .then((data) => setStudentData(data[0]))
      .then((t) => setStudentDataLoading(false));
  }, []);

  const loading = (
    <div>
      <Skeleton active />
    </div>
  );
  const studentDetails = (
    <div>
      <h1
        style={{
          fontWeight: "bold",
          fontSize: "large",
          fontFamily: "cursive",
          marginBottom: "1em",
        }}
      >
        Student Details
      </h1>
      <Descriptions
        bordered
        column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
      >
        <Descriptions.Item label="Name">{studentData.name}</Descriptions.Item>
        <Descriptions.Item label="Year of Batch">
          {studentData.yearOfBatch}
        </Descriptions.Item>
        <Descriptions.Item label="College ID">
          {studentData.college}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );

  return (
    <div>
      <Row align="center">
        <Col>
          <Space direction="vertical">
            <Card>{studentDataLoading ? loading : studentDetails}</Card>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default StudentDetail;
