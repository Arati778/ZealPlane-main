import React, { useRef, useEffect, useState } from "react";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ContentWrapper from "../../contentWrapper/ContentWrapper";
import Img from "../../lazyLoadImage/Img";
import PosterFallback from "../../../assets/no-poster.png";
// import "./style.scss";

// Sample project data
const projectsData = [
  {
    id: "10001",
    name: "Game Of Death Novel",
    Publisher: "Fiction Publication",
    description: "A thrilling mystery novel that keeps readers on the edge of their seats.",
    startDate: "2023-04-01",
    endDate: "2024-04-01",
    status: "In Progress",
    genre: "Mystery",
    ThumnailLink: "https://i.ibb.co/pr8kLJ8/4-adult-man-standing-near-the-haunted-tree-where-lots-of-dolls-are-hanging-during-night-dark-comic-2.png",
    teamMembers: [
      {
        id: "1",
        name: "Krishna Kumar",
        role: "Author",
        email: "krishnakumar050.kk@gmail.com"
      },
      {
        id: "2",
        name: "Shushant Panda",
        role: "Editor",
        email: "mark.twain@example.com"
      }
    ],
    tasks: [
      {
        id: "101",
        title: "Outline Story",
        description: "Create a detailed outline of the story.",
        status: "Completed",
        assignedTo: "Emily Bronte",
        dueDate: "2023-05-01"
      },
      {
        id: "102",
        title: "First Draft",
        description: "Write the first draft of the novel.",
        status: "In Progress",
        assignedTo: "Emily Bronte",
        dueDate: "2023-10-01"
      }
    ],
    links: {
      manuscript: "https://example.com/mystery-novel-manuscript"
    }
  },
  {
    id: "10002",
    name: "Psychopath: Santa Killer",
    Publisher: "Fiction publication",
    description: "An exciting comic book series featuring superheroes and villains.",
    genre: "Thriller",
    startDate: "2023-06-01",
    endDate: "2024-06-01",
    status: "In Progress",
    ThumnailLink: "https://comicsbyte.com/wp-content/uploads/2023/03/Psychopath-Stories-5-Fiction-Comics.jpg",
    teamMembers: [
      {
        id: "7",
        name: "Stan Lee",
        role: "Writer",
        email: "stan.lee@example.com"
      },
      {
        id: "8",
        name: "Jack Kirby",
        role: "Illustrator",
        email: "jack.kirby@example.com"
      }
    ],
    tasks: [
      {
        id: "105",
        title: "Storyline Creation",
        description: "Develop the storyline for the comic book series.",
        status: "Completed",
        assignedTo: "Stan Lee",
        dueDate: "2023-07-01"
      },
      {
        id: "106",
        title: "Character Design",
        description: "Create the visual design of the characters.",
        status: "In Progress",
        assignedTo: "Jack Kirby",
        dueDate: "2023-09-01"
      }
    ],
    links: {
      comicSeriesPage: "https://example.com/comic-book-series"
    }
  },
  {
    id: "10003",
    name: "Chullu aur Lutera Bhoot",
    Publisher: "Swapnil Publication",
    description: "A mobile application designed to help users manage their health and wellness routines.",
    startDate: "2023-05-01",
    endDate: "2024-01-01",
    status: "Completed",
    genre: "Comedy",
    ThumnailLink: "https://i.ibb.co/CBhPhB1/Whats-App-Image-2023-09-13-at-6-36-27-PM.jpg",
    teamMembers: [
      {
        id: "5",
        name: "Arvind",
        role: "writer",
        email: "null"
      },
      {
        id: "6",
        name: "Mohit Arya",
        role: "Artist",
        email: "louis.pasteur@example.com"
      }
    ],
    tasks: [
      {
        id: "105",
        title: "Design UI/UX",
        description: "Create the design for the user interface and user experience.",
        status: "Completed",
        assignedTo: "Marie Curie",
        dueDate: "2023-07-01"
      },
      {
        id: "106",
        title: "Develop Core Features",
        description: "Develop the core features of the app.",
        status: "In Progress",
        assignedTo: "Louis Pasteur",
        dueDate: "2023-12-01"
      }
    ],
    links: {
      prototype: "https://example.com/health-app-prototype"
    }
  },
  {
    id: "10004",
    name: "Pagla Dadu",
    Publisher: "Fiction Publication",
    description: "join the goofiness of Dadu, Fiction studio's leading designer cum destroyer.",
    startDate: "2023-05-01",
    endDate: "2024-01-01",
    status: "Completed",
    genre: "Comedy",
    ThumnailLink: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjhJzJzTjjN8Qc9Hkvom-1V4YiWUXCg59NCJ-i41BQ30ILmNRysafY8aBxdcidFQmoIzNLyy-7wP_9Q4rOXR-93Rz2TrJAEJbICbnMBSG-y0YtMUu9O2xwiSCyTwmnB2z0BohexJhZ5FEQ/s1600/70.jpg",
    teamMembers: [
      {
        id: "7",
        name: "Sushant Panda",
        role: "Creative head",
        email: "null"
      },
      {
        id: "8",
        name: "Santosh Kushwaha",
        role: "Artist",
        email: "louis.pasteur@example.com"
      }
    ],
    tasks: [
      {
        id: "105",
        title: "Design UI/UX",
        description: "Create the design for the user interface and user experience.",
        status: "Completed",
        assignedTo: "Marie Curie",
        dueDate: "2023-07-01"
      },
      {
        id: "106",
        title: "Develop Core Features",
        description: "Develop the core features of the app.",
        status: "In Progress",
        assignedTo: "Louis Pasteur",
        dueDate: "2023-12-01"
      }
    ],
    links: {
      prototype: "https://example.com/health-app-prototype"
    }
  },
  {
    id: "10005",
    name: "Sando ki duniya",
    Publisher: "Fiction Publication",
    description: "A mobile application designed to help users manage their health and wellness routines.",
    startDate: "2023-05-01",
    endDate: "2024-01-01",
    status: "Completed",
    genre: "Comedy",
    ThumnailLink: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgWrnkP1cijFOdNjn3uoVshmIeCsO6J7eCOkLjS4GCGQ3tlkDKBWTRhuDKuLQHdJWibxHa30jJ0u9NIHl90U87SvjZmIyCYtTdIwv7WLxObkDM1MHIMb4LNJoHL_FcP6oaNYTVVHhUp5vI/s1600/17.jpg",
    teamMembers: [
      {
        id: "9",
        name: "Sushant Panda",
        role: "Writer",
        email: "marie.curie@example.com"
      },
      {
        id: "10",
        name: "Santosh Kushwaha",
        role: "Artist",
        email: "louis.pasteur@example.com"
      }
    ],
    tasks: [
      {
        id: "105",
        title: "Design UI/UX",
        description: "Create the design for the user interface and user experience.",
        status: "Completed",
        assignedTo: "Marie Curie",
        dueDate: "2023-07-01"
      },
      {
        id: "106",
        title: "Develop Core Features",
        description: "Develop the core features of the app.",
        status: "In Progress",
        assignedTo: "Louis Pasteur",
        dueDate: "2023-12-01"
      }
    ],
    links: {
      prototype: "https://example.com/health-app-prototype"
    }
  },
  {
    id: "10006",
    name: "Mausaji ke karname",
    Publisher: "Fiction Publication",
    description: "A mobile application designed to help users manage their health and wellness routines.",
    startDate: "2023-05-01",
    endDate: "2024-01-01",
    status: "Completed",
    genre: "Comedy",
    ThumnailLink: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiHIzJgcRxkUQBf4H4DSqu-uKYXKlVhW_3KxxjXqIn1-VfjOa3xMt301uIL6QidpzKQSs5zcMFOjPgOPCImIZ0SPu-RT7ParZ8euP41QYuVDSrxKaYtjaeQMrE44fD3N6FWRX14sue6YUk/s1600/42.jpg",
    teamMembers: [
      {
        id: "5",
        name: "Marie Curie",
        role: "Project Manager",
        email: "marie.curie@example.com"
      },
      {
        id: "6",
        name: "Louis Pasteur",
        role: "Developer",
        email: "louis.pasteur@example.com"
      }
    ],
    tasks: [
      {
        id: "105",
        title: "Design UI/UX",
        description: "Create the design for the user interface and user experience.",
        status: "Completed",
        assignedTo: "Marie Curie",
        dueDate: "2023-07-01"
      },
      {
        id: "106",
        title: "Develop Core Features",
        description: "Develop the core features of the app.",
        status: "In Progress",
        assignedTo: "Louis Pasteur",
        dueDate: "2023-12-01"
      }
    ],
    links: {
      prototype: "https://example.com/health-app-prototype"
    }
  }
  // Add more projects if needed
];

const TopicCarousel = ({ title }) => {
    const carouselContainer = useRef();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Function to generate custom links based on ID
    const getCustomLink = (id) => {
          const customLinks = {
        "10003": "https://comicplane.site/viewer?images=%5B%22https%3A%2F%2Fres.cloudinary.com%2Fdatgyuhmy%2Fimage%2Fupload%2Fv1739855856%2Fproject_images%2Frjochkpbhpx6m6mbnxzd.jpg%22%2C%22https%3A%2F%2Fres.cloudinary.com%2Fdatgyuhmy%2Fimage%2Fupload%2Fv1739855879%2Fproject_images%2Frwayis1iveott16znwlh.jpg%22%2C%22https%3A%2F%2Fres.cloudinary.com%2Fdatgyuhmy%2Fimage%2Fupload%2Fv1739855900%2Fproject_images%2Fmoxmdhnclvf5tyb4bjva.jpg%22%2C%22https%3A%2F%2Fres.cloudinary.com%2Fdatgyuhmy%2Fimage%2Fupload%2Fv1739855916%2Fproject_images%2Fc2a2rsjhwnmnumh1hayc.jpg%22%2C%22https%3A%2F%2Fres.cloudinary.com%2Fdatgyuhmy%2Fimage%2Fupload%2Fv1739855943%2Fproject_images%2Fltdiapx9vrrsnb5v0kb0.jpg%22%5D&start=0",
        "10004": "https://comicplane.site/viewer?images=%5B%22https%3A%2F%2Fres.cloudinary.com%2Fdatgyuhmy%2Fimage%2Fupload%2Fv1751259094%2Fproject_images%2F1751259092839-91-karate-king-2-1_page-0006.jpg%22%2C%22https%3A%2F%2Fres.cloudinary.com%2Fdatgyuhmy%2Fimage%2Fupload%2Fv1751259160%2Fproject_images%2F1751259158926-91-karate-king-2-1_page-0007.jpg%22%2C%22https%3A%2F%2Fres.cloudinary.com%2Fdatgyuhmy%2Fimage%2Fupload%2Fv1751259231%2Fproject_images%2F1751259229875-91-karate-king-2-1_page-0008.jpg%22%2C%22https%3A%2F%2Fres.cloudinary.com%2Fdatgyuhmy%2Fimage%2Fupload%2Fv1751259278%2Fproject_images%2F1751259276690-91-karate-king-2-1_page-0009.jpg%22%2C%22https%3A%2F%2Fres.cloudinary.com%2Fdatgyuhmy%2Fimage%2Fupload%2Fv1751259420%2Fproject_images%2F1751259418403-91-karate-king-2-1_page-0010.jpg%22%5D&start=0",
        "10005": "https://comicplane.site/viewer?images=%5B%22https%3A%2F%2Fres.cloudinary.com%2Fdatgyuhmy%2Fimage%2Fupload%2Fv1751254356%2Fproject_images%2Fh1tjckuxfxdvksjifrut.jpg%22%2C%22https%3A%2F%2Fres.cloudinary.com%2Fdatgyuhmy%2Fimage%2Fupload%2Fv1751254389%2Fproject_images%2Fo5arqruhji3qpaviohos.jpg%22%2C%22https%3A%2F%2Fres.cloudinary.com%2Fdatgyuhmy%2Fimage%2Fupload%2Fv1751254422%2Fproject_images%2Fycfk2c2jbj6qgzthv8r0.jpg%22%2C%22https%3A%2F%2Fres.cloudinary.com%2Fdatgyuhmy%2Fimage%2Fupload%2Fv1751254462%2Fproject_images%2Fsw2b9uoppjrlxdczqqtf.jpg%22%2C%22https%3A%2F%2Fres.cloudinary.com%2Fdatgyuhmy%2Fimage%2Fupload%2Fv1751254496%2Fproject_images%2Fhzgjw2dptmzwntodtwus.jpg%22%2C%22https%3A%2F%2Fres.cloudinary.com%2Fdatgyuhmy%2Fimage%2Fupload%2Fv1751254521%2Fproject_images%2Fikmxggvtym9glf3y6ehv.jpg%22%2C%22https%3A%2F%2Fres.cloudinary.com%2Fdatgyuhmy%2Fimage%2Fupload%2Fv1751254572%2Fproject_images%2Fxgkbzaq4itmggkclryf8.jpg%22%5D&start=0",
    };
        return customLinks[id] || `/home/${id}`; // fallback to internal route
    };

    useEffect(() => {
        setData(
            projectsData.map((item) => ({
                ...item,  
                thumbnailLink: item.ThumnailLink || PosterFallback,
                userName: item.name,
                link: getCustomLink(item.id),
            }))
        );
        setLoading(false);
    }, []);

    const navigation = (dir) => {
        const container = carouselContainer.current;
        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth + 20)
                : container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    };

    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        );
    };

    return (
        <div className="carousel">
            <ContentWrapper>
                {title && <div className="carouselTitle">{title}</div>}
                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigation("left")}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRighttNav arrow"
                    onClick={() => navigation("right")}
                />
                {!loading ? (
                    <div className="carouselItems" ref={carouselContainer}>
                        {data?.map((item) => {
                            return (
                                <div
                                    key={item.id}
                                    className="carouselItem"
                                    onClick={() =>
                                        item.link.startsWith("http")
                                            ? window.open(item.link, "_blank")
                                            : navigate(item.link)
                                    }
                                >
                                    <div className="posterBlock">
                                        <Img src={item.thumbnailLink} />
                                        <img
                                            src={item.userProfilePic}
                                            alt=""
                                            className="avatarImage"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate("/profile");
                                            }}
                                        />
                                    </div>
                                    <div className="textBlock">
                                        <span className="title">
                                            {item.userName}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="loadingSkeleton">
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default TopicCarousel;