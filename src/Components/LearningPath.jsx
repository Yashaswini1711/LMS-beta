import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function LearningPath() {
  const [selectedCourse, setSelectedCourse] = useState({});
  const [courseItem, setCourseItem] = useState([]);
  const [type, setType] = useState("");
  const [instructor, setInstructor] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dateError, setDateError] = useState(false);
  const [formErrors, setFormErrors] = useState(false);
  const location = useLocation();
  const learningPlanID = location.state.learningPlanID;
  const batchId = location.state.batch;

  useEffect(() => {
    fetchCourseItems();
  }, []);

  const fetchCourseItems = async () => {
    try {
      const response = await axios.get("http://172.18.4.108:1111/course");
      if (response.status === 200) {
        setCourseItem(response.data);
      } else {
        console.error("Failed to fetch courses.");
      }
    } catch (error) {
      console.error("Error occurred while fetching courses:", error);
    }
  };

  const handleStartDate = (value) => {
    setStartDate(value);
  };
  const handleEndDate = (value) => {
    setEndDate(value);
  };
  useEffect(() => {
    const dateChecker = startDate.replace(/-/g, "") - endDate.replace(/-/g, "");
    if (dateChecker < 0) {
      console.log("Correct Dates");
      setDateError(false);
    } else if (dateChecker > 0) {
      console.log("wrong dates");
      setDateError(true);
    }
  }, [endDate]);

  const handleChangeType = (value) => {
    setType(value);
  };

  const handleCourseItemChange = (value) => {
    let course = courseItem.filter((item) => item.courseName === value);
    setSelectedCourse(course[0]);
  };

  const handleInstructorChange = (value) => {
    setInstructor(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedCourse && instructor && type && startDate && endDate) {
      if (!dateError) {
        setFormErrors(false);

        const formData = {
          learningPlan: {
            learningPlanID: learningPlanID,
            batchID: batchId,
            type: type,
          },
          course: {
            courseName: selectedCourse.courseName,
            courseID: selectedCourse.courseID,
            level: selectedCourse.level,
          },
          type: type,
          trainer: instructor,
          startDate: startDate,
          endDate: endDate,
        };
        console.log("Form Data:", formData);

        axios
          .post("http://172.18.4.108:1111/learning-plan-path", formData)
          .then((response) => {
            console.log(
              "Learning path data posted successfully:",
              response.data
            );
            console.log("Data is posting successfully");
          })
          .catch((error) => {
            console.error("Error posting learning path data:", error);
            console.log("Data is not posting");
          });
      }
    } else {
      setFormErrors(true);
      console.log("form not submitted");
    }
  };

  return (
    <Card className=" w-full md:w-3/4 lg:w-2/4 xl:w-2/4 mx-auto">
      <CardHeader
        variant="gradient"
        color="gray"
        className="mb-4 grid h-28 place-items-center"
      >
        <Typography variant="h5" color="white" className="mb-2">
          Add Learning Path
        </Typography>
      </CardHeader>
      <CardBody>
        <form
          className="container p-6 bg-white rounded-lg"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <Select
              required
              variant="outlined"
              label="Type"
              id="Type"
              name="Type"
              onChange={handleChangeType}
            >
              <Option value="course">COURSE</Option>
              <Option value="assessments">ASSESSMENTS</Option>
              <Option value="evaluation">Evaluation</Option>
            </Select>
          </div>
          <div className="mb-4">
            <Select
              required
              variant="outlined"
              label="Select Course"
              onChange={handleCourseItemChange}
            >
              {courseItem.map((item) => (
                <Option key={item.courseID} value={item.courseName}>
                  {item.courseName}
                </Option>
              ))}
            </Select>
          </div>
          <div className="mb-4">
            <Input
              id="title"
              name="title"
              variant="outlined"
              label="Instructor Name"
              value={instructor}
              onChange={(e) => handleInstructorChange(e.target?.value)}
              required
            />
          </div>
          <div className="mb-4">
            <Input
              id="start_date"
              type="date"
              variant="outlined"
              label="Start date"
              shrink={true}
              onChange={(e) => handleStartDate(e.target.value)}
              required
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="mb-4">
            <Input
              id="end_date"
              type="date"
              variant="outlined"
              label="End date"
              shrink={true}
              error={dateError ? true : false}
              onChange={(e) => handleEndDate(e.target.value)}
              required
              style={{ cursor: "pointer" }}
            />
            {dateError && dateError ? (
              <p className="text-red-500 text-sm mt-1 ml-1">
                * Date is Invalid
              </p>
            ) : null}
          </div>
          <div className="mb-4 flex justify-end">
            <Button ripple={true} type="submit">
              Add Learning Path
            </Button>
          </div>
        </form>
      </CardBody>
      {formErrors && formErrors ? (
        <div className="absolute  w-[30%] bottom-3 left-[240px] p-4 mb-4 text-base leading-3 text-white bg-red-500 rounded-lg opacity-100 font-regular">
          Kindly fill all the fields
        </div>
      ) : null}
    </Card>
  );
}
