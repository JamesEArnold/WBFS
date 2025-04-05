export const About = () => {
  return (
    <div className="flex flex-col">
      {/* Professional Page Header Section */}
      <section className="relative py-16 bg-white">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black uppercase tracking-wider">ABOUT SHERIFF WEISBURN</h1>
          <div className="h-1 w-32 bg-[#fcd34b] mx-auto mb-4"></div>
          <p className="text-xl max-w-3xl mx-auto">A proven leader with a dedication to public service and community safety.</p>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h2 className="section-title">BIOGRAPHY</h2>
              <p className="mb-4">Sheriff Weisburn has dedicated his career to law enforcement and public service. With over 30 years of experience in the department, he has risen through the ranks with a commitment to integrity, professionalism, and community engagement.</p>
              <p className="mb-4">A graduate of the National Sheriff's Academy and holder of a Bachelor's degree in Criminal Justice, Sheriff Weisburn brings both academic knowledge and practical experience to his role.</p>
              <p>Throughout his career, he has implemented innovative programs that have reduced crime rates, improved department efficiency, and strengthened the relationship between law enforcement and the community.</p>
            </div>
            <div className="flex justify-center items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-black rounded-lg transform rotate-2 translate-x-2 translate-y-2"></div>
                <div className="relative bg-gray-200 rounded-lg overflow-hidden border-4 border-black shadow-xl w-full max-w-md">
                  {/* This would be the sheriff's image - using a placeholder */}
                  <div className="w-full h-80 bg-gray-300 flex items-center justify-center text-gray-500">
                    Sheriff in Uniform
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accomplishments */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center">ACCOMPLISHMENTS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-[#fcd34b] bg-black inline-block px-3 py-1 rounded">FIRST TERM</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Reduced violent crime by 15% through strategic deployment and community policing</li>
                <li>Modernized department equipment and technology</li>
                <li>Established youth outreach programs in all county school districts</li>
                <li>Implemented comprehensive training programs for all department personnel</li>
                <li>Secured grants for community safety initiatives</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-[#fcd34b] bg-black inline-block px-3 py-1 rounded">VISION FOR NEXT TERM</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Expand mental health response team for crisis interventions</li>
                <li>Enhance rural patrol coverage and emergency response times</li>
                <li>Develop advanced training facility for regional law enforcement</li>
                <li>Strengthen partnerships with neighboring jurisdictions</li>
                <li>Implement citizen advisory committee for community input</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Endorsements */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center">ENDORSEMENTS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="p-6 bg-gray-100 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold mb-2">County Police Officers Association</h3>
              <p className="italic">"Sheriff Weisburn has consistently demonstrated outstanding leadership and commitment to officer safety and community service."</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold mb-2">Mayor Johnson</h3>
              <p className="italic">"Our county has never been safer thanks to Sheriff Weisburn's innovative approach to law enforcement."</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold mb-2">Business Owners Coalition</h3>
              <p className="italic">"Sheriff Weisburn understands that public safety is essential for economic prosperity."</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
