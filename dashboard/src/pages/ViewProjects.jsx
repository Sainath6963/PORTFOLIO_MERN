import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Button } from "@/components/ui/button";

const ViewProject = () => {
  const [project, setProject] = useState(null);
  const { id } = useParams();
  const navigateTo = useNavigate();

  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/v1/projects/getSingle/${id}`,
          { withCredentials: true }
        );
        setProject(res.data.project);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load project");
      }
    };
    getProject();
  }, [id]);

  if (!project) {
    return <p className="text-center text-xl mt-10">Loading...</p>;
  }

  const {
    title,
    description,
    technologies,
    stack,
    gitRepoLink,
    deployed,
    projectLink,
    projectBanner,
  } = project;

  const descriptionList = description ? description.split(". ") : [];
  const technologiesList = Array.isArray(technologies) ? technologies : [];

  return (
    <div className="flex mt-7 justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4">
      <div className="w-[100%] px-5 md:w-[1000px] pb-5">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="flex justify-end">
              <Button onClick={() => navigateTo("/")}>
                Return to Dashboard
              </Button>
            </div>
            <div className="mt-10 flex flex-col gap-5">
              <h1 className="text-2xl font-bold">{title}</h1>
              <img
                src={projectBanner?.url || "/noprofile.jpg"}
                alt="Project Banner"
                className="w-full h-auto"
              />
              <div>
                <p className="text-2xl mb-2">Description:</p>
                <ul className="list-disc">
                  {descriptionList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-2xl mb-2">Technologies:</p>
                <ul className="list-disc">
                  {technologiesList.map((tech, index) => (
                    <li key={index}>{tech}</li>
                  ))}
                </ul>
              </div>
              <p className="text-2xl mb-2">
                Stack: <span className="font-semibold">{stack}</span>
              </p>
              <p className="text-2xl mb-2">
                Deployed:{" "}
                <span className="font-semibold">{deployed ? "Yes" : "No"}</span>
              </p>
              <p className="text-2xl mb-2">
                GitHub Repository:{" "}
                <Link className="text-sky-700" target="_blank" to={gitRepoLink}>
                  {gitRepoLink}
                </Link>
              </p>
              <p className="text-2xl mb-2">
                Project Link:{" "}
                <Link className="text-sky-700" target="_blank" to={projectLink}>
                  {projectLink}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProject;
