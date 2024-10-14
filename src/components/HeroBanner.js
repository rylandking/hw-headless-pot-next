/* eslint-disable @next/next/no-img-element */

import * as AnnotationsHelper from "../utils/contentstack/annotations";

export default function HeroBanner(props) {
    return (
        <div className="hero-image" {...props}>
            <img
                className="centered"
                src={props.banner_image[0].secure_url}
                alt="hero banner"
                {...AnnotationsHelper.setFieldPath('.secure_url')}
            />

            <div className="bannertext">
                <h1 className="header1 text-red" {...AnnotationsHelper.setFieldPath('.header')}>
                    {props.header}
                </h1>
                <p className="text-white para" {...AnnotationsHelper.setFieldPath('.banner_text')}>
                    {props.banner_text}
                </p>
            </div>
        </div>
    );
}