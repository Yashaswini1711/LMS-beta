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
    console.log(batch.batchId, typeof type);
    const formData = {
      batchID: 43,
      type: type,
    };

    if (batchItems && type) {
      axios
        .post("http://172.18.4.108:1111/learning-plan", formData)
        .then((response) => {
          console.log("Learning plan saved successfully:", response.data);
          const learningPlanID = response.data.learningPlanID;
          navigate("/path", {
            state: { learningPlanID: learningPlanID, batch: batch.batchId },
          });
        })
        .catch((error) => {
          console.error("Error saving learning plan:", error);
        });
    } else {
      alert("Fill All Fields");
    }

    event.preventDefault();

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
