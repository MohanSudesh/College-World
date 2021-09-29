import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { useHistory } from "react-router-dom";
import { Space, Row, Col, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const ChartBasic = () => {
  const history = useHistory();
  const [state, setState] = useState([["State", "Count"]]);
  const [isstate, setIsstate] = useState(false);

  const [courses, setCourses] = useState([["Courses", "Count"]]);
  const [isCourses, setIsCourses] = useState(false);

  useEffect(() => {
    fetch("/chartData/list/StatesvsCount/")
      .then((res) => res.json())
      .then((data) => {
        setState([...state, ...data]);
        setIsstate(true);
      });

    fetch("/chartData/list/CoursesvsCount/")
      .then((res) => res.json())
      .then((data) => {
        setCourses([...courses, ...data]);
        setIsCourses(true);
      });
  }, []);

  const stateChart = (
    <div>
      <h2
        style={{
          fontWeight: "bold",
          fontSize: "large",
          fontFamily: "cursive",
        }}
      >
        Colleges in States
      </h2>
      <Chart
        width={"400px"}
        height={"300px"}
        chartType="PieChart"
        loader={isstate}
        data={state}
        options={{
          is3D: true,
        }}
        chartEvents={[
          {
            eventName: "select",
            callback({ chartWrapper }) {
              history.push(
                "/college/state/" +
                  state[chartWrapper.getChart().getSelection()[0].row + 1][0]
              );
            },
          },
        ]}
        rootProps={{ "data-testid": "1" }}
      />
    </div>
  );

  const coursesChart = (
    <div>
      <h2
        style={{
          fontWeight: "bold",
          fontSize: "large",
          fontFamily: "cursive",
        }}
      >
        Courses in colleges
      </h2>
      <Chart
        width={"400px"}
        height={"300px"}
        chartType="PieChart"
        loader={isCourses}
        data={courses}
        options={{
          is3D: true,
        }}
        chartEvents={[
          {
            eventName: "select",
            callback({ chartWrapper }) {
              history.push(
                "/college/course/" +
                  courses[chartWrapper.getChart().getSelection()[0].row + 1][0]
              );
            },
          },
        ]}
        rootProps={{ "data-testid": "1" }}
      />
    </div>
  );
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const loadingchart = (
    <div>
      <Spin indicator={antIcon} />
    </div>
  );

  return (
    <div>
      <Row gutter="10" justify="center">
        <Col type="flex" align="middle">
          <Space>{isstate ? stateChart : loadingchart}</Space>
        </Col>
        <Col type="flex" align="middle">
          <Space>{isCourses ? coursesChart : loadingchart}</Space>
        </Col>
      </Row>
    </div>
  );
};

export default ChartBasic;
