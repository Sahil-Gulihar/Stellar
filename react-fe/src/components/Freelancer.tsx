

import { useState, ChangeEvent } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select";
import { Input } from "./ui/input";

"use client";


interface Application {
  id: number;
  title: string;
  company: string;
  status: string;
  description: string;
}

const initialApplications: Application[] = [
  {
    id: 1,
    title: "Web Developer",
    company: "Acme Inc.",
    status: "Applied",
    description: "Looking for an experienced web developer to build a modern e-commerce website.",
  },
  {
    id: 2,
    title: "Graphic Designer",
    company: "Startup X",
    status: "Accepted",
    description: "Seeking a talented graphic designer to create a brand identity for a new startup.",
  },
  {
    id: 3,
    title: "Content Writer",
    company: "Marketing Agency",
    status: "Rejected",
    description: "Need a skilled content writer to create engaging blog posts and marketing materials.",
  },
  {
    id: 4,
    title: "UI Designer",
    company: "SaaS Co.",
    status: "Applied",
    description: "Designing a new user interface for a SaaS platform.",
  },
  {
    id: 5,
    title: "Frontend Developer",
    company: "Fintech Startup",
    status: "Accepted",
    description: "Building a responsive web application for a fintech startup.",
  },
  {
    id: 6,
    title: "Copywriter",
    company: "Marketing Agency",
    status: "Rejected",
    description: "Crafting compelling copy for a new marketing campaign.",
  },
];

export default function Freelancer() {
  const [activeTab, setActiveTab] = useState<string>("trending");
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleAddApplication = (application: Application) => {
    setApplications([...applications, application]);
  };

  const handleAddSkill = () => {
    if (newSkill.trim() !== "") {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveApplication = (id: number) => {
    setApplications(applications.filter((app) => app.id !== id));
  };

  const handleWithdrawApplication = (id: number) => {
    setApplications(applications.map((app) => (app.id === id ? { ...app, status: "Withdrawn" } : app)));
  };

  const handleSortByChange = (value: string) => {
    setSortBy(value);
  };

  const handleSearchTermChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredApplications = applications.filter(
    (app) =>
      app.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const sortedApplications = filteredApplications.sort((a, b) => {
    if (sortBy === "newest") {
      return b.id - a.id;
    } else if (sortBy === "oldest") {
      return a.id - b.id;
    } else if (sortBy === "company") {
      return a.company.localeCompare(b.company);
    } else if (sortBy === "status") {
      return a.status.localeCompare(b.status);
    } else {
      return 0;
    }
  });

  return (
    <div className="flex h-screen">
      <div className="bg-gray-900 text-white w-64 p-6 flex flex-col">
        <div className="flex items-center gap-4 mb-8">
          <BriefcaseIcon className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Freelance Dashboard</h1>
        </div>
        <nav className="flex-1 space-y-4">
          <Button
            variant={activeTab === "trending" ? "outline" : "default"}
            onClick={() => setActiveTab("trending")}
            className="w-full justify-start"
          >
            Trending Gigs
          </Button>
          <Button
            variant={activeTab === "applications" ? "outline" : "default"}
            onClick={() => setActiveTab("applications")}
            className="w-full justify-start"
          >
            Application Management
          </Button>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <BellIcon className="h-6 w-6" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <img src="/placeholder.svg" width="32" height="32" className="rounded-full" alt="Avatar" />
            <span className="sr-only">User menu</span>
          </Button>
        </div>
      </div>
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto py-8 px-6">
          {activeTab === "trending" && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Trending Gigs</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedApplications
                  .filter((app) => app.status === "Applied" || app.status === "Accepted" || app.status === "Rejected")
                  .map((app) => (
                    <Card key={app.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-bold">{app.title}</h3>
                          <Badge
                            className={`px-2 py-1 rounded-full ${
                              app.status === "Applied"
                                ? "bg-blue-500 text-white"
                                : app.status === "Accepted"
                                ? "bg-green-500 text-white"
                                : "bg-red-500 text-white"
                            }`}
                          >
                            {app.status}
                          </Badge>
                        </div>
                        <p className="text-gray-500 mb-4">{app.description}</p>
                        <div className="flex justify-between items-center">
                          <div className="text-gray-500">{app.company}</div>
                          <Button onClick={() => handleAddApplication(app)}>Apply</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </section>
          )}
          {activeTab === "applications" && (
            <>
              <section>
                <h2 className="text-2xl font-bold mb-4">Application Management</h2>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <Label htmlFor="sort-by">Sort by:</Label>
                    <Select value={sortBy} onValueChange={handleSortByChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="oldest">Oldest</SelectItem>
                        <SelectItem value="company">Company</SelectItem>
                        <SelectItem value="status">Status</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-4">
                    <Label htmlFor="search">Search:</Label>
                    <Input
                      id="search"
                      type="text"
                      placeholder="Search applications"
                      value={searchTerm}
                      onChange={handleSearchTermChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedApplications.map((app) => (
                    <Card key={app.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-bold">{app.title}</h3>
                          <Badge
                            className={`px-2 py-1 rounded-full ${
                              app.status === "Applied"
                                ? "bg-blue-500 text-white"
                                : app.status === "Accepted"
                                ? "bg-green-500 text-white"
                                : app.status === "Rejected"
                                ? "bg-red-500 text-white"
                                : "bg-gray-500 text-white"
                            }`}
                          >
                            {app.status}
                          </Badge>
                        </div>
                        <p className="text-gray-500 mb-4">{app.description}</p>
                        <div className="flex justify-between items-center">
                          <div className="text-gray-500">{app.company}</div>
                          <div className="flex gap-2">
                            <Button variant="outline" onClick={() => handleRemoveApplication(app.id)}>
                              Remove
                            </Button>
                            {app.status === "Applied" && (
                              <Button variant="secondary" onClick={() => handleWithdrawApplication(app.id)}>
                                Withdraw
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
              <section>
                <h2 className="text-2xl font-bold mb-4">Upskill</h2>
                <div className="flex items-center gap-4 mb-4">
                  <Input
                    type="text"
                    placeholder="Add a new skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                  />
                  <Button onClick={handleAddSkill}>Add Skill</Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {skills.map((skill, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold">{skill}</h3>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

function BellIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function BriefcaseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );
}
