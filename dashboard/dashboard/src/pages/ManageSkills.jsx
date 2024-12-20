import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  clearAllSkillErrors,
  deleteSkill,
  getAllSkills,
  resetSkillSlice,
  updateSkill,
} from "@/store/slices/skillSlice";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ManageSkills() {
  const navigateTo = useNavigate();
  const handleReturnToDashboard = () => {
    navigateTo("/");
  };

  const dispatch = useDispatch();
  const { loading, skills, error, message } = useSelector(
    (state) => state.skill
  );

  const [newProficiency, setNewProficiency] = useState(1);
  const handleInputChange = (proficiency) => {
    setNewProficiency(proficiency);
  };

  const handleUpdateSkill = (id) => {
    dispatch(updateSkill(id, newProficiency));
  };

  const handleDeleteSkill = (id) => {
    dispatch(deleteSkill(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllSkillErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetSkillSlice());
      dispatch(getAllSkills());
    }
  }, [dispatch, loading, error]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Tabs defaultValue="week">
        <TabsContent value="week">
          <Card>
            <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
              <CardTitle>Manage Your Skills</CardTitle>
              <Button className="w-fit" onClick={handleReturnToDashboard}>
                Return to Dashboard
              </Button>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              {skills.map((element) => {
                return (
                  <Card key={element._id}>
                    <CardHeader className="text-3xl font-bold flex items-center justify-between flex-row">
                      {element.title}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Trash2
                              onClick={() => handleDeleteSkill(element._id)}
                              className="h-5 w-5 hover:text-red-500"
                            />
                          </TooltipTrigger>
                          <TooltipContent side="right" style={{ color: "red" }}>
                            Delete
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </CardHeader>
                    <CardFooter>
                      <Label className="text-2xl mr-2">Proficiency:</Label>
                      <Input
                        type="number"
                        defaultValue={element.proficiency}
                        onChange={(e) => handleInputChange(e.target.value)}
                        onBlur={() => handleUpdateSkill(element._id)}
                      />
                    </CardFooter>
                  </Card>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ManageSkills;
