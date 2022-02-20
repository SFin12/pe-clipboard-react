import React from "react";

export function InfoPage({ title }) {
    return (
        <div className="container">
            <h1 className="header">Info</h1>
            <hr />
            <section>
                <h2>ABOUT:</h2>
                <p>
                    Coach's Clipboard is a daily assessment app for coaches and
                    PE teachers. The intent of the app is to replace the
                    clipboard typically used to track and evaluate players and
                    students.
                </p>
            </section>
            <br />
            <section className=" pb-4">
                <h2>SETUP:</h2>

                <ul>
                    <li>
                        From the menu, go to the gradebook page to setup your
                        first gradebook. For example, "Fall 22" or "JV Baseball
                        22".
                    </li>
                    <li>
                        Once you create a gradebook, you will be redirected to
                        the classes page. Here you can create your classes,
                        teams that you will be evaluating.
                    </li>
                    <li>
                        Now click on a class or team that you created. You can
                        add students or players manually or upload a .csv file.
                    </li>
                    <li>
                        Once you have students on the list, you can begin
                        evaluating them. Click their name to deduct points or
                        click on the points icon to add points.
                    </li>
                    <li>
                        While on the students evaluation page, you will notice a
                        new menu item called student Info. After submitting you
                        first evaluation, you can go to student Info to see more
                        information.
                    </li>
                    <li>
                        Next, you will will want to customize your notes and
                        starting daily points. Go to settings to change the
                        three default notes and their affects. The 4th note is a
                        custom note marked with a question mark.
                    </li>
                </ul>
            </section>
            <section className="pb-5">
                <h2>UPLOADING ROSTER:</h2>
                <p>
                    {" "}
                    To upload a roster, create an excel, pages, or google sheets
                    file with the students or players names listed in the first
                    column. Save the document as a .csv file. Click on the class
                    or team you want to upload the file to and click on the "+"
                    icon or on the upload roster page at the top. Click upload
                    and choose the file.
                </p>
            </section>
        </div>
    );
}
