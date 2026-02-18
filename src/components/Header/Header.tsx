
import NavHeader from "@/components/Header/NavHeader"
import MainHeader from "@/components/Header/MainHeader"
import TopBanner from "@/components/Header/TopBanner"

export default function Header() {
    return (
        <header className="w-full">
            <TopBanner />

            <MainHeader />

            <NavHeader />
        </header>
    )
}
