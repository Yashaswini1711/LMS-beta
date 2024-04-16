import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import axios from "axios"; // Import axios
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function CreatePlan() {
  const [batchItems, setBatchItems] = useState([]);
  const [batch, setBatch] = useState({});
  const [type, setType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchBatchItems();
  }, []);

  const fetchBatchItems = async () => {
    try {
      const response = await axios.get("http://172.18.4.243:8078/batch");
      if (response.status === 200) {
        setBatchItems(response.data);
      } else {
        console.error("Failed to fetch courses.");
      }
    } catch (error) {
      console.error("Error occurred while fetching courses:", error);
    }
  };

  const handleChangeBatch = (value) => {
    let matchedBatch = batchItems.filter((item) => item.batchName === value);
    setBatch(matchedBatch[0]);
  };

  const handleChangeType = (value) => {
    setType(String(value));
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
          axios.post('http://localhost:1111/learningplans/save', formData)
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
        <form
          className="container p-6 bg-white rounded-lg"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <Select
              required
              variant="outlined"
              label="Batch Name"
              onChange={handleChangeBatch}
            >
              {batchItems.map((item) => (
                <Option key={item.batchId} value={item.batchName}>
                  {item.batchName}
                </Option>
              ))}
            </Select>
          </div>
          <div className="mb-4">
            <Select
              variant="outlined"
              label="Type"
              id="Type"
              onChange={handleChangeType}
            >
              <Select.Option value="bootcamp">BOOTCAMP</Select.Option>
              <Select.Option value="on_demand">ON-DEMAND</Select.Option>
              <Select.Option value="mandatory">MANDATORY</Select.Option>
              <Select.Option value="org_wide">ORG-WIDE</Select.Option>
            </Select>
          </div>

          <div className="mb-4 flex justify-end">
            <Button ripple={true} type="submit">
              Add Plan
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
