import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  clearAllProjectErrors,
  deleteProject,
  getAllProject,
  resetProjectSlice,
} from "@/store/slices/projectSlice";
import { Eye, Pen, Trash2 } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ManageProjects() {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const { projects, loading, error, message } = useSelector(
    (state) => state.Projects
  );

  const handleProjectDelete = async (id) => {
    await dispatch(deleteProject(id));
    dispatch(getAllProject()); // ✅ Ensure project list refreshes
  };

  useEffect(() => {
    dispatch(getAllProject()); // ✅ Fetch projects on mount

    if (error) {
      toast.error(error);
      dispatch(clearAllProjectErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
      dispatch(getAllProject()); // ✅ Refresh list after deletion
    }
  }, [dispatch, error, message]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Card>
        <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
          <CardTitle>Manage Your Projects</CardTitle>
          <Button onClick={() => navigateTo("/")}>Return to Dashboard</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Banner</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Stack</TableHead>
                <TableHead className="hidden md:table-cell">Deployed</TableHead>
                <TableHead className="md:table-cell">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects?.length > 0 ? (
                projects.map((project) => (
                  <TableRow key={project._id} className="bg-accent">
                    <TableCell>
                      <img
                        src={project.projectBanner?.url}
                        alt={project.title}
                        className="w-16 h-16"
                      />
                    </TableCell>
                    <TableCell>{project.title}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {project.stack}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {project.deployed ? "Yes" : "No"}
                    </TableCell>
                    <TableCell className="flex gap-3">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link to={`/view/project/${project._id}`}>
                              <Button className="border-green-600 border-2 rounded-full h-8 w-8 text-green-600 hover:text-white hover:bg-green-600">
                                <Eye className="h-5 w-5" />
                              </Button>
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent>View</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link to={`/update/project/${project._id}`}>
                              <Button className="border-yellow-400 border-2 rounded-full h-8 w-8 text-yellow-400 hover:text-black hover:bg-yellow-400">
                                <Pen className="h-5 w-5" />
                              </Button>
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent>Edit</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              className="border-red-600 border-2 rounded-full h-8 w-8 text-red-600 hover:text-white hover:bg-red-600"
                              onClick={() => handleProjectDelete(project._id)}
                            >
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Delete</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-2xl">
                    No projects added.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default ManageProjects;
