import Typewriter from './Typewriter';

const ProjectsPage = () => {
  const projects = [
    {
      title: "APC Configuration System",
      category: "Industrial Automation / Frontend",
      year: "2026",
      image: "/images/project-apc.jpg"
    }
  ];

  return (
    <div className="flex flex-col px-8 md:px-16 pb-12 min-h-[calc(100vh-116px)]">
      <div className="flex flex-col mb-16">
        <h1 className="font-lejour font-normal text-[82.4px] leading-none tracking-tight">
          <Typewriter text="Personal Projects" />
        </h1>
        <div className="w-24 border-t-2 border-black mt-6"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((project, index) => (
          <div key={index} className="group cursor-pointer">
            <div className="aspect-[16/10] bg-gray-100 overflow-hidden mb-4">
              <div className="w-full h-full bg-gray-200 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out">
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-telegraf font-bold text-xl tracking-tight">{project.title}</h3>
                <p className="font-libre text-sm uppercase tracking-widest text-gray-500 font-extralight mt-1">{project.category}</p>
              </div>
              <span className="font-telegraf text-sm text-gray-400">{project.year}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;