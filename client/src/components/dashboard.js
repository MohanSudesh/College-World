import React from "react";
import { Space, Row, Card, Col } from "antd";
import CollegeList from "./collegeList";
import ChartBasic from "./chartBasic";

const Dashboard = () => {
  return (
    <Row align="center">
      <Col>
        <Space
          direction="vertical"
          style={{
            marginTop: "5em",
          }}
        >
          <ChartBasic />

          <Card>
            <h1
              style={{
                fontWeight: "bold",
                fontSize: "large",
                fontFamily: "cursive",
              }}
            >
              All Colleges
            </h1>
            <CollegeList filterBy="none" />
          </Card>
        </Space>
      </Col>
    </Row>
  );
};

export default Dashboard;
