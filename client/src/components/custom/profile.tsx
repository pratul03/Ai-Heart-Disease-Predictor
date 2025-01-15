import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { userAtom } from "@/store/atom/atom";
import { useRecoilValue } from "recoil";
export default function Profile() {
  const healthQuotes: string[] = [
    "Health is the greatest gift, contentment the greatest wealth, faithfulness the best relationship. - Buddha",
    "Take care of your body. It’s the only place you have to live. - Jim Rohn",
    "A healthy outside starts from the inside. - Robert Urich",
    "The first wealth is health. - Ralph Waldo Emerson",
    "It is health that is real wealth and not pieces of gold and silver. - Mahatma Gandhi",
    "To enjoy the glow of good health, you must exercise. - Gene Tunney",
    "An apple a day keeps the doctor away. - Proverb",
    "Your body hears everything your mind says. - Naomi Judd",
    "Healthy citizens are the greatest asset any country can have. - Winston Churchill",
    "Good health and good sense are two of life's greatest blessings. - Publilius Syrus",
  ];

  const user = useRecoilValue(userAtom);
  const randomIndex = Math.floor(Math.random() * healthQuotes.length);
  const healthQuote = healthQuotes[randomIndex];

  return (
    <>
      <Card className="w-[600px] h-min">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome Back ! {user.name} 🖐️</CardTitle>
          <CardDescription className="text-md">Today's Life Quote - <p className="text-green-500">{healthQuote}</p></CardDescription>
        </CardHeader>
        {/* <CardContent>
          
        </CardContent>
        <CardFooter className="flex justify-between">

        </CardFooter> */}
      </Card>
    </>
  );
}
