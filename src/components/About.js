import React from "react";

const About = () => {
  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h1 className="fw-bold">About iNotebook</h1>
        <p className="text-muted">
          Your secure and user-friendly note-taking companion.
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h2 className="card-title">Features</h2>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Secure and private notes for each user.</li>
                <li className="list-group-item">Create, edit, and delete notes with ease.</li>
                <li className="list-group-item">Simple and efficient user interface.</li>
              </ul>
            </div>
          </div>

          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="card-title">Why Choose iNotebook?</h2>
              <p className="card-text">
                iNotebook ensures your notes are stored securely, offering a
                seamless and intuitive way to organize your thoughts and
                important information.
              </p>
              <ul>
                <li>Secure storage for user-specific notes.</li>
                <li>Minimalistic design for enhanced productivity.</li>
                <li>Accessible anytime, anywhere.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;