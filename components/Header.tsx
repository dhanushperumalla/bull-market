import Link from "next/link";
import Image from "next/image";
import NavItems from "@/components/Navitems";
import UserDropdown from "@/components/UserDropdown";

const Header = async ({ user }: { user: User }) => {

    return (
        <header className="sticky top-0 header">
            <div className="container header-wrapper">
                <Link href="/">
                    <Image src="/assets/icons/icon.png" alt="Signalist logo" width={140} height={32} className="h-8 w-auto cursor-pointer" />
                </Link>

            </div>
        </header>
    )
}
export default Header