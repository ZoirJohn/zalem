import LogoIcon from "../assets/img/zz.avif"

export function Logo() {
    return (
        <>
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <img src={LogoIcon} alt="logo" />
            </div>
        </>
    )
}
