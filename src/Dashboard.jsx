import { useAuth } from "./AuthContext";
import { logOut } from "./auth";
import MyJournals from "./MyJournals";

function Dashboard() {
    const { user } = useAuth();

    return (
        <div>
            <header>
                <h1>Journal Budgie 🐦</h1>
                <p>Innovative writing experience that you can share with your friends like clockwork. Customizable, Interactive and Fun for any Long-Distance Friendships or just for getting into the daily habit of journaling in the fun way.</p>

                <button onClick={logOut}>
                    LOG OUT
                </button>
            </header>

            <main>
                <h2> Welcome Back! </h2>
                <p>{user.email}</p>

                <section>
                    <MyJournals />
                </section>

                {/* <section>
                    <h3>Recent Entries</h3>
                    <p>No journal entries yet.</p>
                </section> */}
            </main>
        </div>
    )
}

export default Dashboard;