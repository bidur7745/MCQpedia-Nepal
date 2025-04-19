import ContactForm from "../model/ContactForm.js";

// Submit the contact form
export const submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, subject, description } = req.body;

    // Validate all fields
    if (!name || !email || !phone || !subject || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Save to database
    const newFormEntry = new ContactForm({
      name,
      email,
      phone,
      subject,
      description,
    });

    await newFormEntry.save();

    res.status(201).json({ message: "Form submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while submitting form" });
  }
};


// leter i will manage thos method cause i dont make admin pannel now

// // Get all form submissions (for admin panel)
// export const getAllSubmissions = async (req, res) => {
//   try {
//     const submissions = await ContactForm.find().sort({ createdAt: -1 });
//     res.status(200).json(submissions);
//   } catch (err) {
//     res.status(500).json({ error: "Server error while fetching submissions" });
//   }
// };

// // Get a single submission by ID
// export const getSubmissionById = async (req, res) => {
//   try {
//     const submission = await ContactForm.findById(req.params.id);
//     if (!submission) return res.status(404).json({ error: "Submission not found" });
    
//     res.status(200).json(submission);
//   } catch (err) {
//     res.status(500).json({ error: "Server error while fetching submission" });
//   }
// };

// // Delete a submission by ID
// export const deleteSubmission = async (req, res) => {
//   try {
//     const submission = await ContactForm.findById(req.params.id);
//     if (!submission) return res.status(404).json({ error: "Submission not found" });

//     await submission.deleteOne();
//     res.status(200).json({ message: "Submission deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: "Server error while deleting submission" });
//   }
// };
