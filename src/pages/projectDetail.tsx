import { useParams, useNavigate } from 'react-router-dom';
import Typewriter from '../components/Typewriter';

const projectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const projects: any = {
    'genre-game-classifier': {
      title: 'Genre Game Classifier',
      category: 'Natural Language Processing',
      year: '2024',
      image: '/images/project-apc.jpg',

      overview:
        'Genre Game Classifier is a machine learning project designed to predict game genres based on game titles and descriptions using Natural Language Processing techniques.',

      description:
        'This project was built using preprocessing methods such as case folding, tokenizing, stopword removal, and TF-IDF vectorization. The processed text data is then classified using the Naive Bayes algorithm to predict the most suitable game genre.',

      workflow: [
        {
          image: '/images/project-apc.jpg',
          text: 'User memasukkan judul dan deskripsi game mentah ke dalam form input yang disediakan pada halaman utama.'
        },
        {
          image: '/images/architecture-1.jpg',
          text: 'Proses data preprocessing berjalan di latar belakang: teks dibersihkan melalui case folding, tokenizing, dan stopword removal.'
        },
        {
          image: '/images/architecture-2.jpg',
          text: 'TF-IDF Vectorizer mengubah teks bersih menjadi bentuk matriks numerik, kemudian model Naive Bayes memprediksi genre terbaik beserta persentase probabilitasnya.'
        }
      ],

      technologies: [
        'Python',
        'Scikit-learn',
        'TF-IDF',
        'Naive Bayes',
        'Pandas',
        'React',
        'TailwindCSS',
      ],
    },
  };

  const project = projects[slug as string];

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-[#2A2320] mb-4">404</h1>
          <p className="text-gray-500 mb-8">Project not found.</p>
          <button
            onClick={() => navigate('/projects')}
            className="px-6 py-3 bg-[#2A2320] text-white hover:opacity-90 transition"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-8 md:px-16 py-10 md:py-14">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate('/projects')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#2A2320] transition mb-10"
      >
        ← Back to Projects
      </button>

      {/* HERO SECTION */}
      <div className="flex flex-col gap-6">
        <div>
          <p className="uppercase tracking-[0.3em] text-xs text-gray-400 mb-4">
            {project.category}
          </p>
          
          <h1 className="font-lejour font-normal text-5xl md:text-7xl leading-none tracking-tight text-[#2A2320]">
            <Typewriter text={project.title} />
          </h1>
          
          <div className="w-32 border-t-2 border-black/20 mt-6"></div>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span>{project.year}</span>
          <div className="w-1 h-1 rounded-full bg-gray-300"></div>
          <span>Machine Learning Project</span>
        </div>
      </div>

      {/* MAIN PROJECT IMAGE */}
      <div className="mt-12 relative">
        <div className="absolute -bottom-5 -left-5 w-full h-full bg-[#5E7657] -z-10"></div>
        <div className="border border-black/10 overflow-hidden bg-gray-100 aspect-[16/6]">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* OVERVIEW */}
      <div className="mt-20 max-w-5xl">
        <div className="grid md:grid-cols-[220px_1fr] gap-10">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-gray-400">Overview</p>
          </div>
          <div>
            {/* PERBAIKAN: Menggunakan font-poppins font-extralight */}
            <p className="font-poppins font-extralight text-lg leading-relaxed text-gray-600 text-justify">
              {project.overview}
            </p>
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="mt-20 max-w-5xl">
        <div className="grid md:grid-cols-[220px_1fr] gap-10">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-gray-400">Description</p>
          </div>
          <div>
            {/* PERBAIKAN: Menggunakan font-poppins font-extralight */}
            <p className="font-poppins font-extralight text-lg leading-relaxed text-gray-600 text-justify">
              {project.description}
            </p>
          </div>
        </div>
      </div>

      {/* WORKFLOW */}
      <div className="mt-24 max-w-5xl">
        <div className="grid md:grid-cols-[220px_1fr] gap-10">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-gray-400">Workflow</p>
          </div>
          
          <div className="flex flex-col gap-12">
            {project.workflow.map((step: any, index: number) => (
              <div
                key={index}
                className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start pb-8 border-b border-black/5 last:border-0"
              >
                <div className="xl:col-span-5 aspect-[16/10] bg-gray-50 border border-black/10 overflow-hidden shadow-sm">
                  <img 
                    src={step.image} 
                    alt={`Step ${index + 1}`} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.style.backgroundColor = '#f3f4f6';
                    }}
                  />
                </div>

                <div className="xl:col-span-7 flex gap-4 items-start">
                  <span className="text-gray-400 text-sm font-medium pt-0.5">
                    0{index + 1}
                  </span>
                  <p className="text-[#2A2320] text-base leading-relaxed text-justify font-light">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TECHNOLOGIES */}
      <div className="mt-24 max-w-5xl">
        <div className="grid md:grid-cols-[220px_1fr] gap-10">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-gray-400">Technologies</p>
          </div>
          <div className="flex flex-wrap gap-4">
            {project.technologies.map((tech: string, index: number) => (
              /* PERBAIKAN: Menggunakan font-poppins font-extralight */
              <div
                key={index}
                className="font-poppins font-extralight px-5 py-2 border border-black/10 text-[#2A2320] text-sm hover:bg-[#2A2320] hover:text-white transition cursor-default"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="h-20"></div>
    </div>
  );
};

export default projectDetail;