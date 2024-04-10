import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Input,
    Option,
    Select,
    Typography
} from "@material-tailwind/react";

export function LearningPath() {
    const [selectedCourse, setSelectedCourse] = useState('');
    const [courseItem, setCourseItem] = useState([]);
    const [type, setType] = useState('');
    const [instructor, setInstructor] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        fetchCourseItems();
    }, []);

    const fetchCourseItems = async () => {
        try {
            const response = await axios.get('http://localhost:1111/courses');
            if (response.status === 200) {
                setCourseItem(response.data);
            } else {
                console.error('Failed to fetch courses.');
            }
        } catch (error) {
            console.error('Error occurred while fetching courses:', error);
        }
    };

    const handleTypeChange = (value) => {
        setType(value);
    };

    const handleCourseItemChange = (value) => {
        setSelectedCourse(value);
    };

    const handleInstructorChange = (value) => {
        setInstructor(value);
    };

    const handleStartDateChange = (value) => {
        setStartDate(value);
    };

    const handleEndDateChange = (value) => {
        setEndDate(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const data = {
            pathID: 1,
            learningPlan: {
                learningPlanID: 12
            },
            course: {
                courseID: selectedCourse,
                courseName: courseItem.find(course => course.courseID === selectedCourse)?.courseName || ''
            },
            type: type || '',
            trainer: instructor || 'John Doe',
            startDate: startDate || '2024-04-08',
            endDate: endDate || '2024-04-15'
        };
    
        axios.post('http://localhost:1111/learning-plan-paths', data)
            .then(response => {
                console.log('Learning path data posted successfully:', response.data);
                console.log('Data is posting successfully');
            })
            .catch(error => {
                console.error('Error posting learning path data:', error);
                console.log('Data is not posting');
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
                    Add Learning Path
                </Typography>
            </CardHeader>
            <CardBody>
                <form className='container p-6 bg-white rounded-lg' onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Select value={type} variant="outlined" label="Select Type" onChange={(e) => handleTypeChange(e.target?.value)}>
                            <Option value='Course'>Course</Option>
                            <Option value="Assessment">Assessment</Option>
                            <Option value="Evaluation">Evaluation</Option>
                        </Select>
                    </div>
                    <div className="mb-4">
                        <Select value={selectedCourse} variant="outlined" label="Select Course" onChange={(e) => handleCourseItemChange(e.target?.value)}>
                            {courseItem.map((item) => (
                                <Option key={item.courseID} value={item.courseID}>{item.courseName}</Option>
                            ))}
                        </Select>
                    </div>
                    <div className='mb-4'>
                        <Input id="title" name="title" variant="outlined" label="Instructor Name" value={instructor} onChange={(e) => handleInstructorChange(e.target?.value)} />
                    </div>
                    <div className='mb-4'>
                        <Input id="start_date" name="start_date" type="date" variant="outlined" label="Start date" value={startDate} onChange={(e) => handleStartDateChange(e.target.value)} />
                    </div>
                    <div className='mb-4'>
                        <Input id="end_date" name="end_date" type="date" variant="outlined" label="End date" value={endDate} onChange={(e) => handleEndDateChange(e.target.value)} />
                    </div>
                    <div className="mb-4 flex justify-end">
                        <Button ripple={true} type="submit">
                            Add Learning Path
                        </Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
}
