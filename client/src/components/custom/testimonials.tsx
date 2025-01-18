import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";

const reviews = [
    {
      name: "Jack",
      title: "Healthcare Professional",
      body: "As a healthcare professional, I find this platform invaluable. Its AI-powered predictions are highly accurate and provide actionable insights.",
      img: "https://avatar.vercel.sh/jack",
    },
    {
      name: "Jill",
      title: "Fitness Coach",
      body: "This tool has completely changed how I guide my clients. The heart health predictions are a perfect addition to fitness plans.",
      img: "https://avatar.vercel.sh/jill",
    },
    {
      name: "John",
      title: "Tech Enthusiast",
      body: "It's amazing to see technology and health care combined so seamlessly. This platform sets a new benchmark in predictive health.",
      img: "https://avatar.vercel.sh/john",
    },
    {
      name: "Jane",
      title: "Busy Parent",
      body: "This app has been a lifesaver! Its user-friendly design and actionable health advice give me peace of mind about my family's heart health.",
      img: "https://avatar.vercel.sh/jane",
    },
    {
      name: "Jenny",
      title: "Senior Citizen",
      body: "I feel more confident about my health now. This app is easy to use and provides clear recommendations for better living.",
      img: "https://avatar.vercel.sh/jenny",
    },
    {
      name: "James",
      title: "Entrepreneur",
      body: "Time is precious for me, and this platform ensures I can keep track of my health without hassle. A must-have for busy professionals!",
      img: "https://avatar.vercel.sh/james",
    },
  ];
  

function Testimonials() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden bg-transparent">
      <Marquee pauseOnHover className="[--duration:30s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.title} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:30s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.title} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-purple-900 dark:from-background"></div>
    </div>
  )
}

export default Testimonials



const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  title,
  body,
}: {
  img: string;
  name: string;
  title: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{title}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

