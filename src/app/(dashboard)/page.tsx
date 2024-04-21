import Image from "next/image";

export default async function Home() {

  return (
    <div className="h-60 bg-primary-600">
        <div className="p-10">
          <h1 className="text-secondary-50 font-bold text-2xl">Welcome back 👏</h1>
          <p className="text-secondary-50 font-medium text-sm mt-3">Here is your monthly report</p>
        </div>
        <div className="flex mb-10 p-2 text-center gap-4 justify-center flex-wrap">
            <div className="w-80 rounded-md shadow-xl p-2 bg-secondary-50 text-secondary-900">
                <Image src="https://png.pngtree.com/png-clipart/20210312/original/pngtree-game-score-wood-sign-style-png-image_6072790.png" alt="" height={100} width={110} className="m-auto"/>
                <p className="text-primary-600 font-bold pt-2">590</p>
                <h1 className="p-1 text-sm font-bold">Your current Score in the Leaderboard.</h1>
            </div>
            <div className="w-80 rounded-md shadow-xl bg-secondary-50 text-secondary-900 p-2">
                <Image src="https://cdn-icons-png.flaticon.com/512/3150/3150115.png" alt="" height={100} width={110} className="m-auto"/>
                <p className="text-primary-600 font-bold pt-2">25</p>
                <h1 className="p-1 text-sm font-bold">Your current rank in the Leaderboard.</h1>
            </div>
            <div className="w-80 rounded-md shadow-xl bg-secondary-50 text-secondary-900 p-2">
                <Image src="https://png.pngtree.com/png-clipart/20210312/original/pngtree-game-score-wood-sign-style-png-image_6072790.png" alt="" height={100} width={110} className="m-auto"/>
                <p className="text-primary-600 font-bold pt-2">8</p>
                <h1 className="p-1 text-sm font-bold">No of assignments.</h1>
            </div>
        </div>
    </div>
  );
}
