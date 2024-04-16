import { act, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import { describe, expect, test } from "vitest";
import Course from "../src/Components/Course";

describe("Course Component", () => {
  test("should render the Course component correctly", () => {
    render(
      <MemoryRouter>
        <Course />
      </MemoryRouter>
    );

    const addCourseText = screen.getByText(/Add Course/i);
    const courseNameInput = screen.getByLabelText(/Course Name/i);
    const selectLevelInput = screen.getByLabelText(/Select Level/i);
    const addTopicsButton = screen.getByRole("button", { name: /Add Topics/i });

    expect(addCourseText).toBeInTheDocument();
    expect(courseNameInput).toBeInTheDocument();
    expect(selectLevelInput).toBeInTheDocument();
    expect(addTopicsButton).toBeInTheDocument();
  });

  test("should update the courseData state when input values change", () => {
    render(
      <MemoryRouter>
        <Course />
      </MemoryRouter>
    );

    const courseNameInput = screen.getByLabelText(/Course Name/i);
    const selectLevelInput = screen.getByLabelText(/Select Level/i);

    act(() => {
      userEvent.type(courseNameInput, "React");
      userEvent.selectOptions(selectLevelInput, ["Intermediate"]);
    });

    expect(courseNameInput).toHaveValue("React");
    expect(selectLevelInput).toHaveValue("Intermediate");
  });

  // test("should navigate to /topics and call axios.post when Add Topics button is clicked", async () => {
  //   render(
  //     <MemoryRouter>
  //       <Course />
  //     </MemoryRouter>
  //   );

  //   const addTopicsButton = screen.getByRole("button", { name: /Add Topics/i });
  //   const courseNameInput = screen.getByLabelText(/Course Name/i);
  //   const selectLevelInput = screen.getByLabelText(/Select Level/i);

  //   axios.post.mockResolvedValueOnce({
  //     data: { message: "Course added successfully" },
  //   });

  //   act(() => {
  //     userEvent.type(courseNameInput, "React");
  //     userEvent.selectOptions(selectLevelInput, ["Intermediate"]);
  //     userEvent.click(addTopicsButton);
  //   });

  //   expect(axios.post).toHaveBeenCalledWith("http://172.18.4.108:1111/course", {
  //     courseName: "React",
  //     level: "Intermediate",
  //   });

  //   // Since navigate is asynchronous, we need to wait for the navigation to complete
  //   // This assumes that `useNavigate` pushes the new path to history
  //   await screen.findByText(/Add Topics/i);
  // });
});
