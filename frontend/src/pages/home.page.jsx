import headerImg from "../assets/img/fluffy.jpg"

export function HomePage() {

    return <section className="home-page">
        <img className="full" src={headerImg} alt="" />
        <p>Welcome to Mister Toy!</p>
    </section>
}