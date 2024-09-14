import styles from './ProjectsStyles.module.css';
import viberr from '../../assets/pythonSnake.jpg';
import freshBurger from '../../assets/postingsite.jpg';
import hipsster from '../../assets/food.jpg';
import fitLift from '../../assets/docs.jpg';
import ProjectCard from '../../common/ProjectCard';

function Projects() {
  return (
    <section id="projects" className={styles.container}>
      <h1 className="sectionTitle">Projects</h1>
      <div className={styles.projectsContainer}>
        <ProjectCard
          src={viberr}
          link="https://github.com/Ankush1oo8/Python/tree/main/DAY21"
          h3="Snake Game"
          p="Classic snake game"
        />
        <ProjectCard
          src={freshBurger}
          link="https://github.com/Ankush1oo8/Project"
          h3=" Full Stack Posting Site"
          p="Airbnb inspired project"
        />
        <ProjectCard
          src={hipsster}
          link="https://github.com/Ankush1oo8/NAMASTE_REACT"
          h3="Food Ordering App"
          p="Full Stack Food ordering app"
        />
        <ProjectCard
          src={fitLift}
          link="https://github.com/Ankush1oo8/DOCS-PROJECT"
          h3="DOCS"
          p="Fun App Using Framer"
        />
      </div>
    </section>
  );
}

export default Projects;
