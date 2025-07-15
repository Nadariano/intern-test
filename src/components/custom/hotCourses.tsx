// HotCourses.tsx
import { useEffect, useRef, useState } from "react";

const HotCourses = () => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const platformRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const frames = useRef<HTMLDivElement[]>([]);
  const width = 750;

  const goto = (newIndex: number) => {
    const platform = platformRef.current;
    if (!platform) return;
    setIndex(newIndex);
    platform.style.right = `${width * newIndex}px`;
    if (headingRef.current && frames.current[newIndex]) {
      headingRef.current.innerText = frames.current[newIndex].getAttribute("title") || "";
    }
  };

  const handleNav = (action: string) => {
    if (action === "next" && index < frames.current.length - 1) goto(index + 1);
    if (action === "prev" && index > 0) goto(index - 1);
  };

  const handleGoto = (val: string) => {
    const newIndex = val === "end" ? frames.current.length - 1 : parseInt(val);
    if (!isNaN(newIndex)) goto(newIndex);
  };

  useEffect(() => {
    if (!galleryRef.current) return;
    const gallery = galleryRef.current;
    const platform = platformRef.current;
    if (!platform) return;

    frames.current = Array.from(platform.querySelectorAll(".each-frame"));
    frames.current.forEach(frame => {
      frame.style.width = `${width}px`;
    });

    goto(index);

    const clickHandler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const action = target.getAttribute("data-action");
      if (!action) return;
      if (action === "next" || action === "prev") handleNav(action);
      if (action === "goto") {
        const gotoVal = target.getAttribute("data-goto");
        if (gotoVal) handleGoto(gotoVal);
      }
    };

    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNav("next");
      if (e.key === "ArrowLeft") handleNav("prev");
    };

    gallery.addEventListener("click", clickHandler);
    document.addEventListener("keyup", keyHandler);

    return () => {
      gallery.removeEventListener("click", clickHandler);
      document.removeEventListener("keyup", keyHandler);
    };
  }, [index]);

  return (
    <div>
      <div className="text-xl font-bold m-5 text-center">
        Use Keyboard Arrow Keys To Go Left And Right
      </div>

      <div
        className="gallery border-2 rounded mx-auto m-5 bg-white"
        style={{ width: "750px" }}
        ref={galleryRef}
      >
        <div className="top flex p-2 border-b select-none">
          <div
            className="heading text-gray-800 w-full pl-3 font-semibold my-auto"
            ref={headingRef}
          />
          <div className="buttons ml-auto flex text-gray-600 mr-1">
            <svg
              data-action="prev"
              className="w-7 border-2 rounded-l-lg p-1 cursor-pointer border-r-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                data-action="prev"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <svg
              data-action="next"
              className="w-7 border-2 rounded-r-lg p-1 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                data-action="next"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>
        </div>

        <div className="content-area w-full h-96 overflow-hidden">
          <div className="platform shadow-xl h-full flex relative transition-[right] duration-300" ref={platformRef}>
            {/* Tiger Frame */}
            <div className="each-frame flex-none h-full" title="Tiger">
              <div className="main flex w-full p-8">
                <div className="sub w-4/6 my-auto">
                  <img
                    className="w-full p-8"
                    src="https://images-na.ssl-images-amazon.com/images/I/81eJpEEQwYL._AC_SL1500_.jpg"
                    alt=""
                  />
                </div>
                <div className="sub w-full my-auto">
                  <div className="head text-3xl font-bold mb-4">The Tiger</div>
                  <div className="long-text text-lg">
                    (Panthera tigris) is the largest extant cat species and a member of the genus Panthera. It is most
                    recognisable for its dark vertical stripes on orange-brown fur with a lighter underside...
                  </div>
                  <div
                    className="goto border border-gray-400 text-sm font-semibold inline-block mt-2 p-1 px-2 rounded cursor-pointer"
                    data-action="goto"
                    data-goto="2"
                  >
                    Goto Third Frame
                  </div>
                  <div
                    className="goto border border-gray-400 text-sm font-semibold inline-block mt-2 p-1 px-2 rounded cursor-pointer"
                    data-action="goto"
                    data-goto="end"
                  >
                    Goto Last Frame
                  </div>
                </div>
              </div>
            </div>

            {/* Lion Frame */}
            <div className="each-frame flex-none h-full" title="Lion">
              <div className="main flex w-full p-8">
                <div className="sub w-4/6 my-auto">
                  <img
                    className="w-full p-8"
                    src="https://image.freepik.com/free-vector/cute-lion-cartoon_160606-353.jpg"
                    alt=""
                  />
                </div>
                <div className="sub w-full my-auto">
                  <div className="head text-3xl font-bold mb-4">The Lion</div>
                  <div className="long-text text-lg">
                    The lion is a species in the family Felidae and a member of the genus Panthera. It has a muscular,
                    deep-chested body...
                  </div>
                </div>
              </div>
            </div>

            {/* Rat Frame */}
            <div className="each-frame flex-none h-full" title="Rat">
              <div className="main flex w-full p-8">
                <div className="sub w-4/6 my-auto">
                  <img
                    className="w-full p-8"
                    src="https://i.pinimg.com/originals/07/1d/d0/071dd09d7b36e49139fe2cf08ff728a8.jpg"
                    alt=""
                  />
                </div>
                <div className="sub w-full my-auto">
                  <div className="head text-3xl font-bold mb-4">The Rat</div>
                  <div className="long-text text-lg">
                    Rats are various medium-sized, long-tailed rodents. Species of rats are found throughout the order
                    Rodentia...
                  </div>
                </div>
              </div>
            </div>

            {/* Owl Frame */}
            <div className="each-frame flex-none h-full" title="Owl">
              <div className="main flex w-full p-8">
                <div className="sub w-4/6 my-auto">
                  <img
                    className="w-full p-8"
                    src="https://image.freepik.com/free-vector/cartoon-owl-tree-branch_194935-43.jpg"
                    alt=""
                  />
                </div>
                <div className="sub w-full my-auto">
                  <div className="head text-3xl font-bold mb-4">The Owl</div>
                  <div className="long-text text-lg">
                    Owls are birds from the order Strigiformes, which includes over 200 species of mostly solitary and
                    nocturnal birds of prey...
                  </div>
                  <div
                    className="goto border border-gray-400 text-sm font-semibold inline-block mt-2 p-1 px-2 rounded cursor-pointer"
                    data-action="goto"
                    data-goto="0"
                  >
                    Goto First Frame
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotCourses;
