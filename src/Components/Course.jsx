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
<<<<<<< HEAD
import { useState, useEffect } from "react";
=======
import axios from "axios";
import { useState } from "react";
>>>>>>> b8296c2b199d78da5a662540e204fe9923c7f704
import { useNavigate } from "react-router-dom";

export function Course() {
<<<<<<< HEAD
    const [courseData, setCourseData] = useState({
        courseName: '',
        level: 'basic'
    });
    const navigate = useNavigate();
    const [selectedCourse, setSelectedCourse] = useState('');
    const [courseItem, setCourseItem] = useState([]);
    const [showCourseDiv, setShowCourseDiv] = useState(false);
    const [selectDisabled, setSelectDisabled] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData(prevState => ({
            ...prevState,
            [name]: value // Set the value of the input field directly
        }));
    };

    const fetchCourseItems = async () => {
        try {
            const response = await axios.get('http://172.18.4.108:1111/course');
            if (response.status === 200) {
                setCourseItem(response.data);
            } else {
                console.error('Failed to fetch courses.');
            }
        } catch (error) {
            console.error('Error occurred while fetching courses:', error);
        }
    };

    useEffect(() => {
        fetchCourseItems();
    }, []);

    const handleCourseItemChange = (value) => {
        setSelectedCourse(value);
        setCourseData(prevState => ({
            ...prevState,
            courseName: value // Update courseName in courseData
        }));
    };

    const handleButtonClick = () => {
        setShowCourseDiv(true);
        setSelectDisabled(true);
    };

    const handleAddTopics = () => {
        axios.post('http://172.18.4.108:1111/course', courseData)
            .then(response => {
                console.log('Course data posted successfully:', response.data);
                // Extract course ID from the response data
                const courseId = response.data.courseID;
                console.log(courseId);
                navigate('/topics', { state: { courseId: courseId } });
            })
            .catch(error => {
                console.error('Error posting course data:', error);
            });
    };
    

    return (
        <Card className="w-full md:w-3/4 lg:w-2/4 xl:w-2/4 mx-auto">
            <CardHeader
                variant="gradient"
                color="gray"
                className="mb-4 grid h-28 place-items-center"
            >
                <Typography variant="h5" color="white" className="mb-2">
                    Add Course
                </Typography>
            </CardHeader>
            <CardBody>
                <form className='container p-6 bg-white rounded-lg'>
                    <div className="mb-4">
                        <Select variant="outlined" label="Select Course" onChange={handleCourseItemChange} disabled={selectDisabled}>
                            {courseItem.map((item) => (
                                <Option key={item.courseID} value={item.courseName}>{item.courseName}</Option>
                            ))}
                        </Select>
                    </div>
                    <div className="mb-4">
                        <Select variant="outlined" label="Select Level" disabled={selectDisabled}>
                            <Option value='basic'>Basic</Option>
                            <Option value="Intermediate">Intermediate</Option>
                            <Option value="Advance">Advance</Option>
                        </Select>
                    </div>
                    {showCourseDiv && (
                        <div>
                            <div className='mb-4'>
                                <Input id="courseName" name="courseName" variant="outlined" label="Course Name" value={courseData.courseName} onChange={handleChange} />
                            </div>
                            <div className="mb-4">
                                <Select variant="outlined" label="Select Level" >
                                    <Option value='basic'>Basic</Option>
                                    <Option value="Intermediate">Intermediate</Option>
                                    <Option value="Advance">Advance</Option>
                                </Select>
                            </div>
                        </div>
                    )}
                    <div className="mb-4 flex justify-end">
                        <Button ripple={true} onClick={handleButtonClick}>Add New Course</Button>
                    </div>
                    <div className="mb-4 flex justify-end">
                        <Button ripple={true} onClick={handleAddTopics}>Add Topics</Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
=======
  const [courseData, setCourseData] = useState({
    courseName: "",
    level: "basic",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddTopics = () => {
    navigate("/topics");
    axios
      .post("http://172.18.4.108:1111/course", courseData)
      .then((response) => {
        console.log("Course data posted successfully:", response.data);
        // const learningPlanID = response.data.learningPlanID;
        // navigate("/path", { state: { learningPlanID: learningPlanID } });
      })
      .catch((error) => {
        console.error("Error posting course data:", error);
      });
  };

  return (
    <Card className=" w-full md:w-3/4 lg:w-2/4 xl:w-2/4 mx-auto ">
      <CardHeader
        variant="gradient"
        color="gray"
        className="mb-4 grid h-28 place-items-center"
      >
        <Typography variant="h5" color="white" className="mb-2">
          Add Course
        </Typography>
      </CardHeader>
      <CardBody>
        <form className="container p-6 bg-white rounded-lg">
          <div className="mb-4">
            <Input
              id="courseName"
              name="courseName"
              variant="outlined"
              label="Course Name"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <Select variant="outlined" label="Select Level">
              <Option value="basic">Basic</Option>
              <Option value="Intermediate">Intermediate</Option>
              <Option value="Advance">Advance</Option>
            </Select>
          </div>

          <div className="mb-4 flex justify-end">
            <Button ripple={true} onClick={handleAddTopics}>
              Add Topics
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
>>>>>>> b8296c2b199d78da5a662540e204fe9923c7f704
}
