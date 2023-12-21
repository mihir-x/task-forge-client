import PropTypes from 'prop-types'

const SectionTitle = ({heading}) => {
    return (
        <div className="w-4/12 mx-auto text-center mb-8">
            <h1 className=" text-xl md:text-3xl font-semibold uppercase border-y-4 py-2 md:py-4">{heading}</h1>
        </div>
    );
};

export default SectionTitle;

SectionTitle.propTypes ={
    heading: PropTypes.string
}