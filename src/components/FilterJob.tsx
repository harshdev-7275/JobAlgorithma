"use client";
import React from "react";
import {
  BadgeIndianRupee,
  BriefcaseBusinessIcon,
  IndianRupee,
  MapPin,
  Search,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";

type Filters={
  designation: string;
  location: string;
  experience: string;
  salary: string;
}

export function FilterJob() {
  const [salaryRange, setSalaryRange] = React.useState([50000]);
  const [filters, setFilters] = React.useState<Filters>({
    designation: "",
    location: "",
    experience: "",
    salary: "",
  });

  // Function to parse query parameters
  const parseQueryParams = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const parsedFilters = {
      designation: queryParams.get("designation") || "",
      location: queryParams.get("location") || "",
      experience: queryParams.get("experience") || "",
      salary: queryParams.get("salary") || "",
    };
    setFilters(parsedFilters);
  };

  // Run once when the component mounts
  React.useEffect(() => {
    parseQueryParams();
  }, []);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

function isValidFilterKey(key: string): key is keyof Filters {
  return ['designation', 'location', 'experience', 'salary'].includes(key);
}

const applyFilters = () => {
  const newPayload = Object.keys(filters).reduce((accumulator: { [key: string]: string }, key) => {
    if (isValidFilterKey(key) && filters[key]) {
      accumulator[key] = filters[key];
    }
    return accumulator;
  }, {});

  const query = new URLSearchParams(newPayload).toString();
  window.history.replaceState(null, "", `?${query}`);
};

  return (
    <section className="bg-gradient-to-br from-gray-900 to-black p-4 text-white py-10 sticky top-10 bg-gray-800/30 backdrop-blur-xl">
      <div className="container mx-auto flex items-center gap-8 ">

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="p-1 border rounded-full">
              <Search size={18} />
            </div>

            <Select
              value={filters.designation}
              onValueChange={(value) => handleFilterChange("designation", value)}
            >
              <SelectTrigger className="w-[180px] border-none">
                <SelectValue placeholder="Select Designation" />
              </SelectTrigger>
              <SelectContent className="bg-black text-gray-400 border-none ">
                <SelectItem className="cursor-pointer" value="software-engineer">
                  Software Engineer
                </SelectItem>
                <SelectItem className="cursor-pointer" value="data-scientist">Data Scientist</SelectItem>
                <SelectItem className="cursor-pointer" value="product-manager">Product Manager</SelectItem>
                <SelectItem className="cursor-pointer" value="marketing-specialist">
                  Marketing Specialist
                </SelectItem>
                <SelectItem className="cursor-pointer" value="ui-ux-designer">UI/UX Designer</SelectItem>
                <SelectItem className="cursor-pointer" value="hr-manager">
                  Human Resources Manager
                </SelectItem>
                <SelectItem className="cursor-pointer" value="business-analyst">
                  Business Analyst
                </SelectItem>
                <SelectItem className="cursor-pointer" value="sales-executive">Sales Executive</SelectItem>
                <SelectItem className="cursor-pointer" value="devops-engineer">DevOps Engineer</SelectItem>
                <SelectItem className="cursor-pointer" value="customer-support">
                  Customer Support Representative
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>


        <Separator orientation="vertical" className="h-10 bg-gray-600" />


        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="p-1 border rounded-full">
              <MapPin size={18} />
            </div>

            <Select
              value={filters.location}
              onValueChange={(value) => handleFilterChange("location", value)}
            >
              <SelectTrigger className="w-[180px] border-none">
                <SelectValue placeholder="Work Location" />
              </SelectTrigger>
              <SelectContent className="bg-black text-gray-400 border-none ">
                <SelectItem className="cursor-pointer" value="delhi">Delhi</SelectItem>
                <SelectItem className="cursor-pointer" value="mumbai">Mumbai</SelectItem>
                <SelectItem className="cursor-pointer" value="bangalore">Bangalore</SelectItem>
                <SelectItem className="cursor-pointer" value="chennai">Chennai</SelectItem>
                <SelectItem className="cursor-pointer" value="kolkata">Kolkata</SelectItem>
                <SelectItem className="cursor-pointer" value="hyderabad">Hyderabad</SelectItem>
                <SelectItem className="cursor-pointer" value="pune">Pune</SelectItem>
                <SelectItem className="cursor-pointer" value="ahmedabad">Ahmedabad</SelectItem>
                <SelectItem className="cursor-pointer" value="jaipur">Jaipur</SelectItem>
                <SelectItem className="cursor-pointer" value="lucknow">Lucknow</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>


        <Separator orientation="vertical" className="h-10 bg-gray-600" />


        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="p-1 border rounded-full">
              <BriefcaseBusinessIcon size={18} />
            </div>

            <Select
              value={filters.experience}
              onValueChange={(value) => handleFilterChange("experience", value)}
            >
              <SelectTrigger className="w-[180px] border-none">
                <SelectValue placeholder="Experience" />
              </SelectTrigger>
              <SelectContent className="bg-black text-gray-400 border-none ">
                <SelectItem className="cursor-pointer" value="fresher">Fresher</SelectItem>
                <SelectItem className="cursor-pointer" value="1-2-years">1-2 Years</SelectItem>
                <SelectItem className="cursor-pointer" value="3-5-years">3-5 Years</SelectItem>
                <SelectItem className="cursor-pointer" value="6-10-years">6-10 Years</SelectItem>
                <SelectItem className="cursor-pointer" value="10-plus-years">10+ Years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>


        <Separator orientation="vertical" className="h-10 bg-gray-600" />


        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="p-1 border rounded-full">
              <IndianRupee size={18} />
            </div>

            <Select
              value={filters.salary}
              onValueChange={(value) => handleFilterChange("salary", value)}
            >
              <SelectTrigger className="w-[180px] border-none">
                <SelectValue placeholder="Salary" />
              </SelectTrigger>
              <SelectContent className="bg-black text-gray-400 border-none ">
                <SelectItem className="cursor-pointer" value="0-5-lpa">₹0 - ₹5 LPA</SelectItem>
                <SelectItem className="cursor-pointer" value="5-10-lpa">₹5 - ₹10 LPA</SelectItem>
                <SelectItem className="cursor-pointer" value="10-20-lpa">₹10 - ₹20 LPA</SelectItem>
                <SelectItem className="cursor-pointer" value="20-30-lpa">₹20 - ₹30 LPA</SelectItem>
                <SelectItem className="cursor-pointer" value="30-plus-lpa">₹30+ LPA</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

          <Button
        onClick={applyFilters}
        className="ml-4 px-4 py-2 text-gray-700"
        variant={"outline"}
      >
        Apply Filters
      </Button>
       
      </div>


    
    </section>
  );
}
