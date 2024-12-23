import React, { useEffect, useState } from "react";

const About = () => {
  return (
    <div className="w-full flex flex-col overflow-x-hidden">
      <div className="relative">
        <h1
          className="flex gap-4 items-center text-[2rem] sm:text-[2.75rem] 
          md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] 
          lg:leading-[90px] tracking-[15px] mx-auto w-fit font-extrabold about-h1"
          style={{
            background: "hsl(222.2 84% 4.9%)",
          }}
        >
          <span className="text-tubeLight-effect font-extrabold">
            {" "}
            ABOUT ME
          </span>
        </h1>
        <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
      </div>
      <div className="text-center">
        <p className="uppercase text-xl text-slate-400">
          Allow me to introduce myself.
        </p>
      </div>
      <div>
        <div className="grid md:grid-cols-2 my-8 sm:my-20 gap-14">
          <div className="flex justify-center items-center">
            <img
              src="/photo.jpg"
              alt="avatar"
              className="bg-lime-700 p-2 sm:p-4 rotate-[deg] h-[240px] sm:h-[340px] md:h-[350px] lg:h-[450px]"
            />
          </div>
          <div className="flex justify-center flex-col tracking-[1px] text-xl gap-5">
            <p>
              Hi, I’m Sainath Balkawade, a passionate and driven Computer
              Science Engineering graduate at Trinity College of Engineering and
              Research, Pune with a B.E in CSE. With a strong foundation in
              software development, machine learning, and web technologies, I’m
              always excited to take on new challenges that allow me to grow and
              innovate.
            </p>
            <p>
              I’ve had the opportunity to intern as a Machine Learning Engineer
              at Helium Consulting, where I worked on optimizing Transformer
              models, reducing deployment time, and improving inference speeds.
              My expertise spans across technologies like PyTorch, TensorFlow,
              Hugging Face, and ONNX. I’ve also worked on a variety of exciting
              projects, including building real-time chat applications using
              ReactJS, Node.js, and MongoDB, and implementing an intelligent
              Face Detection System using Python, OpenCV, and machine learning
              algorithms.
            </p>
            <p>
              Apart from coding, I have leadership experience as the Vice
              President of the Computer Department at TCOER, where I led teams,
              organized technical boot camps, and conducted workshops on topics
              such as web development and data structures.
            </p>
            <p>
              I thrive on solving complex problems, exploring emerging
              technologies, and collaborating with like-minded individuals.
              Outside of work, you can find me experimenting with new ideas,
              contributing to open-source projects, and enhancing my technical
              skills.
            </p>
          </div>
        </div>
        <p className="tracking-[1px] text-xl">
          Feel free to connect with me or explore my work on GitHub and
          LinkedIn. Let's build something great together!
        </p>
      </div>
    </div>
  );
};

export default About;
