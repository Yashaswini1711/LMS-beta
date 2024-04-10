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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios

export function CreatePlan() {
    const [description, setDescription] = useState('');
    const [batch, setBatch] = useState(''); // Set initial state for batch
    const [type, setType] = useState(''); // Set initial state for type
    const navigate = useNavigate();

    const handleChangeBatch = (value) => {
        setBatch(value);
    };
    
    const handleChangeType = (value) => {
        setType(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    
        // Form data to be sent in the POST request
        const formData = {
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
    
        // Axios POST request to the learning-plan-paths endpoint
        axios.post('http://localhost:1111/learning-plan-paths', formData)
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
        <Card className="mt-6 w-full md:w-3/4 lg:w-2/4 xl:w-2/4 mx-auto ">
            <CardHeader
                variant="gradient"
                color="gray"
                className="mb-4 grid h-28 place-items-center"
            >
                <Typography variant="h5" color="white" className="mb-2">
                    Add Learning Plan
                </Typography>
            </CardHeader>
            <CardBody>
                <form className='container p-6 bg-white rounded-lg' onSubmit={handleSubmit}>
                    <div className="mb-4">
                    <Select variant="outlined" label="Batch Name" id="batch" name="batch" onChange={handleChangeBatch}>
    <Option value='batch1'>Batch1</Option>
    <Option value="batch2">Batch2</Option>
    <Option value="batch3">Batch3</Option>
    <Option value="od102">OD102</Option>
    <Option value="ow101">OW101</Option>
</Select>
                    </div>
                    <div className="mb-4">
                    <Select variant="outlined" label="Type" id="Type" name="Type" value="Type" onChange={handleChangeType}>
    <Option value='bootcamp'>BOOTCAMP</Option>
    <Option value="on_demand">ON-DEMAND</Option>
    <Option value="mandatory">MANDATORY</Option>
    <Option value="org_wide">ORG-WIDE</Option>
</Select>
                    </div>
                    <div className='mb-4'>
                        <Input id="start_date" name="start_date" type="date" variant="outlined" label="Start date" shrink={true} />
                    </div>
                    <div className='mb-4'>
                        <Input id="end_date" name="end_date" type="date" variant="outlined" label="End date" shrink={true}/>
                    </div>
                    <div className="mb-4 flex justify-end">
                        <Button ripple={true} type="submit">Add Plan</Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
}
