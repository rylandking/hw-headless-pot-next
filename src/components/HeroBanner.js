/* eslint-disable @next/next/no-img-element */

import * as AnnotationsHelper from "../utils/contentstack/annotations";

export default function HeroBanner(props) {
    return (
        <div className="hero-image" {...props}>
            <img
                src={props.banner_image[0].secure_url}
                alt="hero banner"
                {...AnnotationsHelper.setFieldPath('.secure_url')}
            />

            <div className="bannertext">
                <h1 className="header1" {...AnnotationsHelper.setFieldPath('.header')} dangerouslySetInnerHTML={{ __html: props.header }} />
                <p className="text-white para" {...AnnotationsHelper.setFieldPath('.banner_text')} dangerouslySetInnerHTML={{ __html: props.banner_text }} />
            </div>
        </div>
    );
}