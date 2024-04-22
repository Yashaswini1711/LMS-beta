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
import { useLocation, useNavigate } from "react-router-dom";

export function LearningPath() {
  const [selectedCourse, setSelectedCourse] = useState({});
  const [courseItem, setCourseItem] = useState([]);
  const [type, setType] = useState("");
  const [instructor, setInstructor] = useState("");
  const [startDateOfPlan, setStartDate] = useState("");
  const [endDateOfPlan, setEndDate] = useState("");
  const [dateError, setDateError] = useState(false);
  const [endDateAlert, setEndDateAlert] = useState(false);
  const [showInternalTrainers, setShowInternalTrainers] = useState(false);
  const [showExternalTrainers, setShowExternalTrainers] = useState(false);
  const [InternalTrainer, setInternalTrainer] = useState("");
  const [ExternalTrainer, setExternalTrainer] = useState("");

  const location = useLocation();
  const learningPlanID = location.state.learningPlanID;
  const {
    batchId,
    batchName,
    batchDescription,
    startDate,
    endDate,
    employeeId,
    batchSize,
  } = location.state.batch;

  const [AlertOpen, setAlertOpen] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [dateAlert, setDateAlert] = useState(false);
  const navigate = useNavigate();

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
    const dateChecker =
      startDateOfPlan.replace(/-/g, "") - endDateOfPlan.replace(/-/g, "");
    if (endDateOfPlan) {
      if (dateChecker < 0) {
        if (endDateOfPlan < endDate) {
          //endDate
          console.log("Correct Dates");
          setDateError(false);
          setEndDateAlert(false);
        } else {
          setEndDateAlert(true);
        }
      } else if (dateChecker > 0) {
        console.log("wrong dates");
        setDateError(true);
      }
    }
  }, [endDateOfPlan]);

  useEffect(() => {
    const startDateOfPlanString = startDateOfPlan.replace(/-/g, "");
    const startDateString = startDate.replace(/-/g, ""); //startDate

    if (startDateOfPlan) {
      if (startDateOfPlanString < startDateString) {
        setDateAlert(true);
      } else {
        setDateAlert(false);
      }
    }
  }, [startDateOfPlan]);

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

    if (
      selectedCourse &&
      type &&
      startDateOfPlan &&
      endDateOfPlan &&
      (InternalTrainer || ExternalTrainer)
    ) {
      if (!dateError && !dateAlert && !endDateAlert) {
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
          trainer: InternalTrainer || ExternalTrainer,
          startDate: startDateOfPlan,
          endDate: endDateOfPlan,
        };
        console.log("Form Data:", formData);

        axios
          .post(
            "http://172.18.4.108:1111/learning-plan-path/multiple",
            formData
          )
          .then((response) => {
            console.log(
              "Learning path data posted successfully:",
              response.data
            );
            setSuccessAlert(true);
            setTimeout(() => {
              setSuccessAlert(false);
              navigate("/admindashboard");
            }, 2000);
            console.log("Data is posting successfully");
          })
          .catch((error) => {
            console.error("Error posting learning path data:", error);
            console.log("Data is not posting");
          });
      }
    } else {
      setAlertOpen(true);
      setTimeout(() => {
        setAlertOpen(false);
      }, 2000);
      console.log("form not submitted");
    }
  };
  const DateFormater = (value) => {
    const datesValue = value.replace(/-/g, ",");
    const date = new Date(datesValue);

    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    return formattedDate;
  };
  const OpenInternalTrainer = () => {
    setShowInternalTrainers(true);
    setShowExternalTrainers(false);
  };
  const OpenExternalTrainer = () => {
    setShowExternalTrainers(true);
    setShowInternalTrainers(false);
  };

  const handleExternalTrainerName = (value) => {
    setExternalTrainer(value);
    setInternalTrainer("");
  };

  const handleInternalTrainerName = (value) => {
    setInternalTrainer(value);
    setExternalTrainer("");
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
            <Select
              required
              variant="outlined"
              label="Select Trainer"
              id="Select Trainer"
              name="Select Trainer"
            >
              <Option value="Internal Trainer" onClick={OpenInternalTrainer}>
                Internal Trainer
              </Option>
              <Option value="External Trainer" onClick={OpenExternalTrainer}>
                External Trainer
              </Option>
            </Select>
            {showInternalTrainers && (
              <div className="mb-4 mt-4">
                <Select
                  variant="outlined"
                  label="Internal Trainers"
                  onChange={handleInternalTrainerName}
                >
                  <Option value="Krithic">Krithic</Option>
                  <Option value="Krithic">Krithic</Option>
                  <Option value="Krithic">Krithic</Option>
                  <Option value="Krithic">Krithic</Option>
                </Select>
              </div>
            )}
            {showExternalTrainers && (
              <div className="mb-4 mt-4">
                <Input
                  label="ExternalTrainer Name"
                  value={ExternalTrainer}
                  onChange={(e) => handleExternalTrainerName(e.target?.value)}
                />
              </div>
            )}
          </div>
          <div className="mb-4">
            <Input
              id="start_date"
              type="date"
              variant="outlined"
              label="Start date"
              shrink={true}
              onChange={(e) => handleStartDate(e.target.value)}
              style={{ cursor: "pointer" }}
            />
            {dateAlert && dateAlert ? (
              <p className="text-red-500 text-sm mt-1 ml-1">
                {`* Date should be within the specific batch Timeline ${DateFormater(
                  startDate
                )} & ${DateFormater(endDate)}`}
              </p>
            ) : null}
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
              style={{ cursor: "pointer" }}
            />
            {dateError && dateError ? (
              <p className="text-red-500 text-sm mt-1 ml-1">
                * Date is Invalid
              </p>
            ) : null}
            {endDateAlert && (
              <p className="text-red-500 text-sm mt-1 ml-1">
                {`* Date should be within the specific batch Timeline ${DateFormater(
                  startDate
                )} & ${DateFormater(endDate)}`}
              </p>
            )}
          </div>

          <div className="mb-4 flex justify-end gap-2">
            <Button className="" ripple={true}>
              +
            </Button>
            <Button ripple={true} type="submit">
              Add Learning Path
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
