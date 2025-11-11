import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    hashed_password: {
        type: String,
        required: 'Password is required'
    }
});

UserSchema.virtual('password')
    .set(function(password) {
        this._password = password;
        // Use 12 salt rounds for good security
        this.hashed_password = bcrypt.hashSync(password, 12);
    })
    .get(function() {
        return this._password;
    });

UserSchema.path('hashed_password').validate(function(v) {
    if (this._password && this._password.length < 6) {
        this.invalidate('password', 'Password must be at least 6 characters.');
    }
    if (this.isNew && !this._password) {
        this.invalidate('password', 'Password is required');
    }
}, null);

UserSchema.methods = {
    authenticate: function(plainText) {
        return bcrypt.compareSync(plainText, this.hashed_password)
    }
}

export default mongoose.model('User', UserSchema);