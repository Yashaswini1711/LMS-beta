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

    const handleChangeType = (value) => {
        setType(value);
    };

    const handleCourseItemChange = (value) => {

        setSelectedCourse(value);
        console.log(selectedCourse);
    };

    const handleInstructorChange = (value) => {
        setInstructor(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = {
            trainer: instructor,
            type: type,
            startDate: startDate,
            endDate: endDate,
            course: selectedCourse
        };
    
        console.log('Form Data:', formData);
    
        try {
            const response =  axios.post('http://172.18.4.108:1111/learning-plan-path', formData);
            console.log('Learning path data posted successfully:', response.data);
            console.log('Data is posting successfully');
        } catch (error) {
            console.error('Error posting learning path data:', error);
            console.log('Data is not posting');
        }
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
                        <Select variant="outlined" label="Type" id="Type" name="Type"  onChange={handleChangeType}>
                            <Option value='course'>COURSE</Option>
                            <Option value="assessments">ASSESSMENTS</Option>
                            <Option value="evaluation">Evaluation</Option>
                        </Select>
                    </div>
                    <div className="mb-4">
                        <Select  variant="outlined" label="Select Course" onChange={ handleCourseItemChange}>
                            {courseItem.map((item) => (
                                <Option key={item.courseID} value={item.courseName}>{item.courseName}</Option>
                            ))}
                        </Select>
                    </div>
                    <div className='mb-4'>
                        <Input id="title" name="title" variant="outlined" label="Instructor Name" value={instructor} onChange={(e) => handleInstructorChange(e.target?.value)} />
                    </div>
                    <div className='mb-4'>
                        <Input id="start_date" name="start_date" type="date" variant="outlined" label="Start date" shrink={true} onChange={(e) => setStartDate(e.target.value)} />
                    </div>
                    <div className='mb-4'>
                        <Input id="end_date" name="end_date" type="date" variant="outlined" label="End date" shrink={true} onChange={(e) => setEndDate(e.target.value)} />
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
