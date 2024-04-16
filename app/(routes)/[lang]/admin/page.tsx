import {LanguageIcon} from "@heroicons/react/24/outline";

export default function adminPanel(){
    return (
        <div className={"bg-white rounded-xl p-6"}>
            <p className={"font-semibold text-lg mb-2"}>What&apos;s new</p>
            <ul className={"list-disc mx-8 text-sm"}>
                <li>UI and UX improvements</li>
                <li>
                    <div className={"flex gap-1 items-center"}>
                        <LanguageIcon width={16} height={16}/>
                        multi-language interface
                    </div>
                </li>
            </ul>
        </div>
    )
}