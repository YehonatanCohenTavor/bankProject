import React from 'react';

function Home() {
    return (
        <div>
            <h1>Hilma Bank</h1>
            <div>
                <video width="320" height="240" autoPlay={true} muted loop>
                    <source src="/home_page_video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                </video>
            </div>
            <section>
                <p>loruem</p>
            </section>
        </div>
    );
}

export default Home;