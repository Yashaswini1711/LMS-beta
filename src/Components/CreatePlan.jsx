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
        setType(String(value)); // Convert value to string before setting state
    };
    

    const handleSubmit = (event) => {
        const formData = {
          batch: batch,
          type: type,
          start_date: event.target.start_date.value,
          end_date: event.target.end_date.value,
        };
        const start = event.target.start_date.value;
        const end = event.target.end_date.value;
        const dateChecker = start.replace(/-/g, "") - end.replace(/-/g, "");
     
        if (dateChecker < 0) {
        //   Axios POST request to the learningplans/save endpoint
          axios.post('http://172.18.4.108:1111/learning-plan', formData)
              .then(response => {
                  console.log('Learning plan saved successfully:', response.data);
                  // Redirect to another page after successful submission
                //   navigate("/path");
              })
              .catch(error => {
                  console.error('Error saving learning plan:', error);
              });
        } else {
          alert("Enter Correct Dates");
        }
     
        event.preventDefault();
     
        // Form data to be sent in the POST request
     
        // Reset form fields after submission
        event.target.reset();
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
                            <Select.Option value='batch1'>Batch1</Select.Option>
                            <Select.Option value="batch2">Batch2</Select.Option>
                            <Select.Option value="batch3">Batch3</Select.Option>
                            <Select.Option value="od102">OD102</Select.Option>
                            <Select.Option value="ow101">OW101</Select.Option>
                        </Select>
                    </div>
                    <div className="mb-4">
                        <Select variant="outlined" label="Type" id="Type" name="Type" value={type} onChange={handleChangeType}>
                            <Select.Option value='bootcamp'>BOOTCAMP</Select.Option>
                            <Select.Option value="on_demand">ON-DEMAND</Select.Option>
                            <Select.Option value="mandatory">MANDATORY</Select.Option>
                            <Select.Option value="org_wide">ORG-WIDE</Select.Option>
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
