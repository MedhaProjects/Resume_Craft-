const ResumeTemplates = () => {
    const templates = [
      { id: 1, name: "Creative", free: true },
      { id: 2, name: "Basic", free: true },
      { id: 3, name: "Premium", free: false },
    ];
  
    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Choose a [Free] Resume Template</h2>
        <div className="grid grid-cols-3 gap-4">
          {templates.map((template) => (
            <div key={template.id} className="border p-4 rounded-md shadow-sm">
              <h3 className="text-xl font-semibold">{template.name}</h3>
              <p>{template.free ? "Free" : "Premium"}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ResumeTemplates;
  