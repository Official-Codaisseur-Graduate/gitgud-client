import * as React from "react";
import "./LandingPage.css";

export default function LandingPage(props) {
  return (
    <section className="landing-page">
      <div className="landing-page__header">
        <p className='logo'>GitGud</p>
        <p>A validator of your GitHub profile and Git use </p>
        <p>
          designed to provide feedback for job seekers and graduated students
        </p>
      </div>
      <div className="landing-page__description">
        <h2>HOW</h2>
        <p>
          <b>First it checks your public profile</b> - A good GitHub profile can
          impress the interviewer.
        </p>
        <b>Second it validates your pinned repositories on how you use Git</b>-
        Proper use of version control with Git can show that you are a
        structured worker and is able to work in development teams. We chose to
        focus on your pinned repos because you can present certain project as
        you portfolio for potential employers
      </div>
      <div className="landing-page__description">
        <h2>WHY</h2>
        <p>
          You can use GitHub as your resume for job hunting. For developers it
          is important to code regularly, be able to work in teams, communicate
          properly and contiue with a learning curve. Obviously this is
          something you say you can do and write it on your resume, but with
          GitHub you are able to show that you can do this. Which will give you
          headsup on your next interview.
        </p>
        <p>
          Unfortunately many recent graduates or job seekers lack a proper
          GitHub profile. And as Codaisseur teachers can acknowledge, the
          feedback seems repetitive. Therefore we developed this tool to provide
          this feedback which is based on various resources accross the internet
          and using live data from the GitHub API.{" "}
        </p>
      </div>

      <div className="landing-page__description">
        <h2>WHO</h2>
        <p>
          As three graduates of the Codaisseur Academy in Amsterdam we developed
          this tool from scratch with Rein op ‘t Land - a teacher and developer
          at Codaisseur - who acted as our Product Owner
        </p>
        <h2 className="contributors">CONTRIBUTORS</h2>
        <div className=" profiles">
          <div className="profile">
            <img
              src="https://media.licdn.com/dms/image/C4D03AQHZVf98b8_9rQ/profile-displayphoto-shrink_800_800/0?e=1560988800&v=beta&t=GJsvLqPTRx9mVyd6mJV-vfNWvZiWeTfkMRM12kTgnh0"
              alt="Oleksandra"
            />
            <h3>Oleksandra Akulshyna</h3>

            <a
              href="https://www.linkedin.com/in/akulshyna/"
              rel="noopener noreferrer"
              target="_blank"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/w3bgir1"
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub
            </a>
          </div>

          <div className="profile">
            <img
              src="https://media.licdn.com/dms/image/C4E03AQHbh18z_ce4NA/profile-displayphoto-shrink_200_200/0?e=1560988800&v=beta&t=Sdjy4ObNeIBXtc4oVvJOeSUeG6oXsw8_0K0pKRwRYZM"
              alt="Vincent"
            />
            <h3>Vincent de Graaf</h3>
            <a
              href="https://www.linkedin.com/in/vincent-de-graaf-7a5375a4/"
              rel="noopener noreferrer"
              target="_blank"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/vdegraaf"
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub
            </a>
          </div>

          <div className="profile">
            <img
              src="https://media.licdn.com/dms/image/C4D03AQFJAEpuEOJn2A/profile-displayphoto-shrink_800_800/0?e=1560988800&v=beta&t=Pfb7rIZKrgWPpbpcfP7Q9mVhO1mui-t5HSrgzXe6Bgc"
              alt="Natalia"
            />
            <h3>Natalia Volchatova</h3>
            <a
              href="https://www.linkedin.com/in/nataliavolchatova/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/Klackky"
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
